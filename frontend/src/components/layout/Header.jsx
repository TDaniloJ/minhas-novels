import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NotificationBell from "../common/NotificationBell";
import { useTheme } from "../../contexts/ThemeContext";
import {
  BookOpen,
  User,
  LogOut,
  Search,
  Heart,
  Clock,
  Menu,
  X,
  ChevronDown,
  Book,
  Settings,
  LayoutDashboard,
  Moon,
  Sun,
} from "lucide-react";

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [browseDropdownOpen, setBrowseDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const browseRef = useRef(null);
  const userRef = useRef(null);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (browseRef.current && !browseRef.current.contains(event.target)) {
        setBrowseDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary-600 font-bold text-xl"
          >
            <BookOpen className="w-8 h-8" />
            <span className="hidden sm:block">MangaVerse</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar mangás ou novels..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">

                          <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                title={isDark ? "Modo Claro" : "Modo Escuro"}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            {/* Browse Dropdown */}
            <div className="relative" ref={browseRef}>
              <button
                onClick={() => setBrowseDropdownOpen(!browseDropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition"
              >
                <span>Explorar</span>
                <ChevronDown className="w-4 h-4" />
              </button>



              {browseDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                  <Link
                    to="/mangas"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition"
                    onClick={() => setBrowseDropdownOpen(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Mangás</span>
                  </Link>
                  <Link
                    to="/novels"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition"
                    onClick={() => setBrowseDropdownOpen(false)}
                  >
                    <Book className="w-4 h-4" />
                    <span>Novels</span>
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    to="/search"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition"
                    onClick={() => setBrowseDropdownOpen(false)}
                  >
                    <Search className="w-4 h-4" />
                    <span>Busca Avançada</span>
                  </Link>
                </div>
              )}
            </div>

            {user ? (
              <>
                {/* Notificações */}
                <NotificationBell />

                {/* User Dropdown */}
                <div className="relative" ref={userRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                      {user.username[0].toUpperCase()}
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="font-semibold">{user.username}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Meu Perfil</span>
                      </Link>

                      <Link
                        to="/favorites"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Heart className="w-4 h-4" />
                        <span>Favoritos</span>
                      </Link>

                      <Link
                        to="/history"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Clock className="w-4 h-4" />
                        <span>Histórico</span>
                      </Link>

                      {isAdmin() && (
                        <>
                          <div className="border-t border-gray-200 my-2"></div>
                          <Link
                            to="/admin"
                            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition text-purple-600"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Painel Admin</span>
                          </Link>
                        </>
                      )}

                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition text-red-600 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition"
                >
                  Entrar
                </Link>
                <Link to="/register" className="btn-primary">
                  Cadastrar
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg w-full text-left"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span>{isDark ? "Modo Claro" : "Modo Escuro"}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {/* Search Mobile */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </form>

            <div className="space-y-2">
              <Link
                to="/mangas"
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen className="w-5 h-5" />
                <span>Mangás</span>
              </Link>

              <Link
                to="/novels"
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Book className="w-5 h-5" />
                <span>Novels</span>
              </Link>

              {user ? (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Perfil</span>
                  </Link>

                  <Link
                    to="/favorites"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5" />
                    <span>Favoritos</span>
                  </Link>

                  <Link
                    to="/history"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Clock className="w-5 h-5" />
                    <span>Histórico</span>
                  </Link>

                  {isAdmin() && (
                    <>
                      <div className="border-t border-gray-200 my-2"></div>
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg text-purple-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Painel Admin</span>
                      </Link>
                    </>
                  )}

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg text-red-600 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sair</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 bg-primary-600 text-white rounded-lg text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
