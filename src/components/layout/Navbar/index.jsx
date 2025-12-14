import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Zap, Calendar, Trophy, User, LogIn, Users, BarChart2 } from 'lucide-react';
import { 
  NavWrapper, NavContent, Logo, MenuList, MenuItem, 
  ActionGroup, ThemeButton, LoginButton 
} from './stlye'; 

const Navbar = ({ isDarkMode, toggleTheme }) => { 
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { id: '/', label: '홈', icon: Zap },
        { id: '/schedule', label: '일정', icon: Calendar },
        { id: '/drivers', label: '드라이버', icon: User },
        { id: '/team', label: '팀', icon: Users },     
        { id: '/standings', label: '순위', icon: Trophy },
        { id: '/stats', label: '통계', icon: BarChart2 } 
    ];

    return (
        <NavWrapper>
            <NavContent>
                <Logo onClick={() => navigate('/')}>
                    F1<span>.GG</span>
                </Logo>

                <MenuList>
                    {navItems.map((item) => (
                        <MenuItem 
                            key={item.id}
                            onClick={() => navigate(item.id)}
                            $isActive={location.pathname === item.id}
                        >
                            <item.icon size={14} />
                            {item.label}
                        </MenuItem>
                    ))}
                </MenuList>

                <ActionGroup>
                    <ThemeButton onClick={toggleTheme}>
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </ThemeButton>
                    
                    <LoginButton>
                        <LogIn size={14} /> 로그인
                    </LoginButton>
                </ActionGroup>
            </NavContent>
        </NavWrapper>
    );
};

export default Navbar;