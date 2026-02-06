import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Zap, Calendar, Trophy, User, LogIn, LogOut, Users, BarChart2, Heart } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import Search from '../../common/Search/Search';
import {
  NavWrapper, NavContent, Logo, MenuList, MenuItem,
  ActionGroup, ThemeButton, LoginButton, UserInfo
} from './style';

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const navItems = [
        { id: '/', label: '홈', icon: Zap },
        { id: '/schedule', label: '일정', icon: Calendar },
        { id: '/drivers', label: '드라이버', icon: User },
        { id: '/teams', label: '팀', icon: Users }, // team -> teams (복수형 추천)
        { id: '/standings', label: '순위', icon: Trophy },
        { id: '/stats', label: '분석', icon: BarChart2 }, // 통계 -> 분석 (더 전문적으로)
        { id: '/favorites', label: '즐겨찾기', icon: Heart }
    ];

    return (
        <NavWrapper>
            <NavContent>
                <Logo onClick={() => navigate('/')}>
                    RACE<span>.GG</span>
                </Logo>

                <MenuList>
                    {navItems.map((item) => {
                        // 현재 경로가 해당 메뉴의 ID로 시작하면 활성화 (하위 페이지 포함)
                        const isActive = location.pathname === item.id || 
                                       (item.id !== '/' && location.pathname.startsWith(item.id));
                        
                        return (
                            <MenuItem 
                                key={item.id}
                                onClick={() => navigate(item.id)}
                                $isActive={isActive}
                            >
                                <item.icon size={16} strokeWidth={2.5} /> {/* 아이콘 두께 조정 */}
                                <span>{item.label}</span>
                                {/* 활성화 시 하단 레드 바 효과 (style.js에서 처리) */}
                                {isActive && <div className="active-bar" />}
                            </MenuItem>
                        );
                    })}
                </MenuList>

                <ActionGroup>
                    <Search />
                    <ThemeButton onClick={toggleTheme} aria-label="테마 변경">
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </ThemeButton>

                    {isAuthenticated ? (
                        <>
                            <UserInfo>
                                <User size={16} />
                                <span>{user?.nickname}</span>
                            </UserInfo>
                            <LoginButton onClick={handleLogout}>
                                <LogOut size={16} />
                                <span>로그아웃</span>
                            </LoginButton>
                        </>
                    ) : (
                        <LoginButton onClick={() => navigate('/login')}>
                            <LogIn size={16} />
                            <span>로그인</span>
                        </LoginButton>
                    )}
                </ActionGroup>
            </NavContent>
        </NavWrapper>
    );
};

export default Navbar;