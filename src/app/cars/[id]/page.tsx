import { notFound } from "next/navigation";
import { fetchCar } from "@/services/car.service";
import Gallery from "@/components/cars/detail/Gallery";
import CarInfo from "@/components/cars/detail/CarInfo";
import BookingForm from "@/components/cars/detail/BookingForm";
import Reviews from "@/components/cars/detail/Reviews";

export const dynamic = "force-dynamic";

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await fetchCar(id);

  if (!car) notFound();

  return (
    <div className="max-w-360 mx-auto px-6 lg:px-16 py-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-6">
        <div className="flex flex-col gap-6 min-w-0">
          <Gallery make={car.make} modelName={car.modelName} year={car.year} />
          <CarInfo car={car} />
        </div>

        <BookingForm carId={id} pricePerDay={car.pricePerDay} location={car.location} />
      </div>

      <Reviews totalReviews={car.totalReviews} />
    </div>
  );
}