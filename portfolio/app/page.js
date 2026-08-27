import ProfileSidebar from '@/components/ProfileSidebar';
import WorkGallery from '@/components/WorkGallery';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row">
        <ProfileSidebar />
        <WorkGallery />
      </div>
      <div className="max-w-[1600px] mx-auto">
        <Footer />
      </div>
    </main>
  );
}
