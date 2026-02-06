import fastf1
import pandas as pd
import numpy as np
import json
import os
import warnings
from datetime import datetime

# 1. 경고 메시지 무시 (터미널을 깨끗하게)
warnings.simplefilter(action='ignore', category=FutureWarning)

# 2. 캐시 설정
CACHE_DIR = 'f1_cache'
if not os.path.exists(CACHE_DIR):
    os.makedirs(CACHE_DIR)
fastf1.Cache.enable_cache(CACHE_DIR)

def safe_mean(data_list):
    """ 리스트가 비어있거나 NaN이 포함된 경우 0.0을 반환 """
    if not data_list:
        return 0.0
    val = np.mean(data_list)
    if isinstance(val, float) and np.isnan(val):
        return 0.0
    return round(val, 3)

def generate_driver_id(full_name):
    """ URL 친화적인 ID 생성 """
    return full_name.lower().replace(' ', '_')

# 🔥 [설정] 2025 시즌 루키 코드 리스트
# 이 리스트에 있는 선수는 작년 순위가 'None'으로 처리되어 화면에 'ROOKIE' 배지가 뜸
ROOKIE_CODES = ['ANT', 'BOR', 'BEA', 'COL', 'LAW', 'DOO', 'HAD']

def run_driver_expert_analysis(num_races=10):
    current_year = datetime.now().year
    print(f"🔥 {current_year} 시즌 F1 드라이버 정밀 분석 (스프린트 포인트 포함)...")

    try:
        schedule = fastf1.get_event_schedule(current_year, include_testing=False)
        completed = schedule[schedule['EventDate'] < pd.Timestamp.now()]
        if completed.empty:
            print("❌ 경기 데이터 없음")
            return
        
        all_rounds = completed['RoundNumber'].tolist()
        target_rounds = all_rounds[-num_races:] if all_rounds else []
        print(f"📊 분석 대상: 총 {len(all_rounds)}경기 / 정밀 분석: 최근 {len(target_rounds)}경기")
    except Exception as e:
        print(f"❌ 초기화 에러: {e}")
        return

    # ---------------------------------------------------
    # [Step 1] 시즌 포인트 집계 (본선 + 스프린트)
    # ---------------------------------------------------
    print("\n🏆 [Step 1] 챔피언십 포인트 집계 중 (스프린트 포함)...")
    season_data_map = {} 

    for round_num in all_rounds:
        # 1. 스프린트 레이스 점수 확인 (있는 경기만)
        try:
            sprint = fastf1.get_session(current_year, round_num, 'Sprint')
            sprint.load(laps=False, telemetry=False, weather=False, messages=False)
            
            for drv in sprint.drivers:
                info = sprint.results.loc[drv]
                code = info['Abbreviation']
                points = info['Points']
                
                if code not in season_data_map:
                    season_data_map[code] = {
                        "points": 0, "team": info['TeamName'], 
                        "fullName": info['FullName'], "code": code
                    }
                season_data_map[code]["points"] += points
        except: 
            pass # 스프린트 없는 라운드는 패스

        # 2. 본선 레이스 점수 확인
        try:
            session = fastf1.get_session(current_year, round_num, 'R')
            session.load(laps=False, telemetry=False, weather=False, messages=False)
            
            for drv in session.drivers:
                info = session.results.loc[drv]
                code = info['Abbreviation']
                points = info['Points']
                
                if code not in season_data_map:
                    season_data_map[code] = {
                        "points": 0, "team": info['TeamName'], 
                        "fullName": info['FullName'], "code": code
                    }
                season_data_map[code]["points"] += points
        except: 
            pass

    if not season_data_map:
        print("❌ 포인트 데이터가 없습니다.")
        return
        
    leader_points = max(d["points"] for d in season_data_map.values())

    # ---------------------------------------------------
    # [Step 2] 정밀 퍼포먼스 분석
    # ---------------------------------------------------
    print(f"\n🏎️ [Step 2] 퍼포먼스 데이터 마이닝 (최근 {len(target_rounds)}경기)...")
    
    raw_metrics_store = {} 

    for round_num in target_rounds:
        print(f"   📦 Round {round_num} 분석 중...")
        try:
            sq = fastf1.get_session(current_year, round_num, 'Q')
            sr = fastf1.get_session(current_year, round_num, 'R')
            sq.load(laps=True, telemetry=False, weather=False, messages=False)
            sr.load(laps=True, telemetry=False, weather=False, messages=False)

            # 최신 메서드 사용 (pick_drivers, pick_laps)
            pole_lap = sq.laps.pick_fastest()
            pole_time = pole_lap['LapTime'].total_seconds() if pole_lap is not None else None
            
            race_laps = sr.laps.pick_track_status('1').pick_quicklaps()
            global_avg_pace = race_laps['LapTime'].dt.total_seconds().mean()

            for drv in sr.drivers:
                res = sr.results.loc[drv]
                code = res['Abbreviation']
                
                if code not in raw_metrics_store:
                    raw_metrics_store[code] = {
                        "q_gaps": [], "r_paces": [], "stds": [], 
                        "gains": [], "start_gains": [], "teammate_deltas": [],
                        "error_count": 0, "total_laps": 0
                    }
                data = raw_metrics_store[code]

                # 1. 예선 속도
                if pole_time:
                    try:
                        # pick_driver -> pick_drivers로 수정 (경고 제거)
                        my_q = sq.laps.pick_drivers(drv).pick_fastest()['LapTime'].total_seconds()
                        data["q_gaps"].append(((my_q - pole_time) / pole_time) * 100)
                    except: pass
                
                # 2. 레이스 페이스
                my_r_laps = sr.laps.pick_drivers(drv).pick_track_status('1').pick_quicklaps()
                if len(my_r_laps) > 5:
                    l_secs = my_r_laps['LapTime'].dt.total_seconds()
                    data["r_paces"].append(l_secs.mean() - global_avg_pace)
                    data["stds"].append(l_secs.std())
                    data["total_laps"] += len(l_secs)
                    errors = my_r_laps[l_secs > (global_avg_pace * 1.07)]
                    data["error_count"] += len(errors)

                # 3. 순위 변동
                if str(res['ClassifiedPosition']).isnumeric():
                    grid, finish = float(res['GridPosition']), float(res['ClassifiedPosition'])
                    if grid > 0: data["gains"].append(grid - finish)

                # 4. 스타트 반응 (pick_lap -> pick_laps 수정)
                try:
                    lap1 = sr.laps.pick_drivers(drv).pick_laps(1)['Position'].values[0]
                    data["start_gains"].append(float(res['GridPosition']) - float(lap1))
                except: pass

            # 5. 팀메이트 비교
            teams = sr.results['TeamName'].unique()
            for t in teams:
                t_drvs = sr.results[sr.results['TeamName'] == t]
                if len(t_drvs) == 2:
                    try:
                        d1, d2 = t_drvs.index[0], t_drvs.index[1]
                        p1 = sr.laps.pick_drivers(d1).pick_quicklaps()['LapTime'].dt.total_seconds().mean()
                        p2 = sr.laps.pick_drivers(d2).pick_quicklaps()['LapTime'].dt.total_seconds().mean()
                        if not np.isnan(p1) and not np.isnan(p2):
                            c1, c2 = t_drvs.loc[d1]['Abbreviation'], t_drvs.loc[d2]['Abbreviation']
                            if c1 in raw_metrics_store: raw_metrics_store[c1]["teammate_deltas"].append(p1 - p2)
                            if c2 in raw_metrics_store: raw_metrics_store[c2]["teammate_deltas"].append(p2 - p1)
                    except: pass
        except Exception as e:
            pass

    # ---------------------------------------------------
    # [Step 3] 데이터 병합 및 저장
    # ---------------------------------------------------
    print("\n💾 [Step 3] 데이터 병합 및 JSON 저장...")
    
    sorted_drivers = sorted(season_data_map.values(), key=lambda x: x['points'], reverse=True)
    final_output = []

    for rank, info in enumerate(sorted_drivers):
        code = info['code']
        raw = raw_metrics_store.get(code, {
            "q_gaps": [], "r_paces": [], "stds": [], 
            "gains": [], "start_gains": [], "teammate_deltas": [],
            "error_count": 0, "total_laps": 0
        })
        
        error_pct = (raw["error_count"] / raw["total_laps"] * 100) if raw["total_laps"] > 0 else 0.0

        # 🔥 루키 여부에 따라 작년 순위 설정
        if code in ROOKIE_CODES:
            last_year_rank = None
        else:
            # 데모용 시뮬레이션 (실제로는 작년 데이터 DB 연동 권장)
            last_year_rank = (rank + 1) + np.random.randint(-2, 3)
            if last_year_rank < 1: last_year_rank = 1

        driver_report = {
            "driverId": generate_driver_id(info['fullName']),
            "code": code,
            "team": info['team'],
            "fullName": info['fullName'],
            "season_stats": {
                "rank": rank + 1,
                "points": info['points'],
                "gap_to_leader": leader_points - info['points'],
                "last_year_rank": last_year_rank  # None이면 루키
            },
            "metrics": {
                "qualifying_gap_pct": safe_mean(raw["q_gaps"]),
                "race_pace_diff": safe_mean(raw["r_paces"]),
                "consistency_sd": safe_mean(raw["stds"]),
                "incident_risk_pct": round(error_pct, 2),
                "position_gain": safe_mean(raw["gains"]),
                "start_reaction_gain": safe_mean(raw["start_gains"]),
                "teammate_comparison": safe_mean(raw["teammate_deltas"])
            }
        }
        final_output.append(driver_report)

    # 저장 경로 자동 탐색
    current_dir = os.path.dirname(os.path.abspath(__file__))
    save_path = os.path.join(current_dir, '..', 'data', 'driver_expert_analysis.json')
    os.makedirs(os.path.dirname(save_path), exist_ok=True)

    with open(save_path, 'w', encoding='utf-8') as f:
        json.dump(final_output, f, indent=2, ensure_ascii=False)

    print(f"\n✅ 분석 완료! ({len(final_output)}명)")
    print(f"📍 저장 위치: {os.path.abspath(save_path)}")

if __name__ == "__main__":
    run_driver_expert_analysis(num_races=10)