import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import MangaList from './pages/MangaList';
import Login from './pages/Login';
import Register from './pages/Register';
import MangaDetail from './pages/MangaDetail';
import MangaReader from './pages/MangaReader';
import ProtectedRoute from './components/common/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import CreateManga from './pages/admin/CreateManga';
import AddChapter from './pages/admin/AddChapter';
import NovelList from './pages/NovelList';
import CreateNovel from './pages/admin/CreateNovel';
import AddNovelChapter from './pages/admin/AddNovelChapter';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import EditManga from './pages/admin/EditManga';
import EditNovel from './pages/admin/EditNovel';
import NovelDetail from './pages/NovelDetail';
import ReadingHistory from './pages/ReadingHistory';
import SearchPage from './pages/SearchPage';
import NovelReader from './pages/NovelReader';
import SuperDashboard from './pages/admin/SuperDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mangas" element={<MangaList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/manga/:id" element={<MangaDetail />} />
              <Route path="/manga/:id/chapter/:chapterId" element={<MangaReader />} />

              <Route path="/novel/:id" element={<NovelDetail />} />
              <Route path="/novel/:id/chapter/:chapterId" element={<NovelReader />} />

              <Route path="/history" element={
                <ProtectedRoute>
                  <ReadingHistory />
                </ProtectedRoute>
              } />
              <Route path="/search" element={<SearchPage />} />

              <Route path="/admin/manga/:id/edit" element={
                <ProtectedRoute adminOnly>
                  <EditManga />
                </ProtectedRoute>
              } />
              <Route path="/admin/novel/:id/edit" element={
                <ProtectedRoute adminOnly>
                  <EditNovel />
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              <Route path="/favorites" element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } />

              <Route path="/novels" element={<NovelList />} />
              <Route path="/admin/novel/new" element={
                <ProtectedRoute adminOnly>
                  <CreateNovel />
                </ProtectedRoute>
              } />
              <Route path="/admin/novel/:id/chapter/new" element={
                <ProtectedRoute adminOnly>
                  <AddNovelChapter />
                </ProtectedRoute>
              } />


            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <SuperDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/manga/new" element={
              <ProtectedRoute adminOnly>
                <CreateManga />
              </ProtectedRoute>
            } />
            <Route path="/admin/manga/:id/chapter/new" element={
              <ProtectedRoute adminOnly>
                <AddChapter />
              </ProtectedRoute>
            } />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;