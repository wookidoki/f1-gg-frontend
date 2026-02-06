import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Zap, Calendar, Trophy, User, LogIn, LogOut, Users, BarChart2, Heart, Menu, X, GitCompare } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import Search from '../../common/Search/Search';
import {
  NavWrapper, NavContent, Logo, MenuList, MenuItem,
  ActionGroup, ThemeButton, LoginButton, UserInfo,
  HamburgerButton, MobileOverlay, MobileDrawer, DrawerHeader,
  DrawerCloseButton, MobileMenuList, MobileMenuItem,
  MobileAuthSection, MobileUserInfo, MobileAuthButton
} from './style';

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated, logout } = useAuth();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setIsDrawerOpen(false);
        navigate('/');
    };

    const handleNavigate = (path) => {
        navigate(path);
        setIsDrawerOpen(false);
    };

    const navItems = [
        { id: '/', label: '홈', icon: Zap },
        { id: '/schedule', label: '일정', icon: Calendar },
        { id: '/drivers', label: '드라이버', icon: User },
        { id: '/teams', label: '팀', icon: Users },
        { id: '/standings', label: '순위', icon: Trophy },
        { id: '/stats', label: '분석', icon: BarChart2 },
        { id: '/compare', label: '비교', icon: GitCompare },
        { id: '/favorites', label: '즐겨찾기', icon: Heart }
    ];

    const isActivePath = (path) => {
        return location.pathname === path ||
               (path !== '/' && location.pathname.startsWith(path));
    };

    return (
        <>
            <NavWrapper>
                <NavContent>
                    <Logo onClick={() => navigate('/')}>
                        RACE<span>.GG</span>
                    </Logo>

                    {/* PC 메뉴 */}
                    <MenuList>
                        {navItems.map((item) => {
                            const isActive = isActivePath(item.id);
                            return (
                                <MenuItem
                                    key={item.id}
                                    onClick={() => navigate(item.id)}
                                    $isActive={isActive}
                                >
                                    <item.icon size={16} strokeWidth={2.5} />
                                    <span>{item.label}</span>
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

                        {/* 모바일 햄버거 버튼 */}
                        <HamburgerButton onClick={() => setIsDrawerOpen(true)}>
                            <Menu size={20} />
                        </HamburgerButton>
                    </ActionGroup>
                </NavContent>
            </NavWrapper>

            {/* 모바일 드로어 */}
            {isDrawerOpen && (
                <>
                    <MobileOverlay onClick={() => setIsDrawerOpen(false)} />
                    <MobileDrawer>
                        <DrawerHeader>
                            <Logo onClick={() => handleNavigate('/')}>
                                RACE<span>.GG</span>
                            </Logo>
                            <DrawerCloseButton onClick={() => setIsDrawerOpen(false)}>
                                <X size={20} />
                            </DrawerCloseButton>
                        </DrawerHeader>

                        <MobileMenuList>
                            {navItems.map((item) => {
                                const isActive = isActivePath(item.id);
                                return (
                                    <MobileMenuItem
                                        key={item.id}
                                        onClick={() => handleNavigate(item.id)}
                                        $isActive={isActive}
                                    >
                                        <item.icon size={20} />
                                        <span>{item.label}</span>
                                    </MobileMenuItem>
                                );
                            })}
                        </MobileMenuList>

                        <MobileAuthSection>
                            {isAuthenticated ? (
                                <>
                                    <MobileUserInfo>
                                        <div className="avatar">
                                            <User size={20} />
                                        </div>
                                        <div className="info">
                                            <div className="name">{user?.nickname}</div>
                                            <div className="email">{user?.email}</div>
                                        </div>
                                    </MobileUserInfo>
                                    <MobileAuthButton onClick={handleLogout}>
                                        <LogOut size={18} />
                                        로그아웃
                                    </MobileAuthButton>
                                </>
                            ) : (
                                <MobileAuthButton
                                    $variant="primary"
                                    onClick={() => handleNavigate('/login')}
                                >
                                    <LogIn size={18} />
                                    로그인
                                </MobileAuthButton>
                            )}

                            {/* 테마 토글 */}
                            <MobileAuthButton
                                onClick={toggleTheme}
                                style={{ marginTop: '8px' }}
                            >
                                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                                {isDarkMode ? '라이트 모드' : '다크 모드'}
                            </MobileAuthButton>
                        </MobileAuthSection>
                    </MobileDrawer>
                </>
            )}
        </>
    );
};

export default Navbar;
