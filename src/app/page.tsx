import HeroBanners from "@/components/home/HeroBanners";
import PickupDropoff from "@/components/home/PickupDropoff";
import CarsSection from "@/components/home/CarsSection";
import ShowMoreBar from "@/components/home/ShowMoreBar";
import { fetchCars } from "@/services/car.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [popular, recommendation] = await Promise.all([
    fetchCars("sort=-averageRating&limit=4"),
    fetchCars("sort=-createdAt&limit=8&page=1"),
  ]);

  return (
    <div className="max-w-360 mx-auto px-6 lg:px-16 py-8 flex flex-col gap-8">
      <HeroBanners />
      <PickupDropoff />
      <CarsSection title="Popüler Araçlar" cars={popular.data} viewAllHref="#" />
      <CarsSection title="Önerilen Araçlar" cars={recommendation.data} />
      <ShowMoreBar total={recommendation.pagination.total} />
    </div>
  );
}