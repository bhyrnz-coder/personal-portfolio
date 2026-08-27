import ProfileSidebar from '@/components/ProfileSidebar';
import WorkGallery from '@/components/WorkGallery';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row">
        <ProfileSidebar />
        <WorkGallery />
      </div>
      <Footer />
    </main>
  );
}
