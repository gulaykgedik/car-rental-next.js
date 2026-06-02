import { CheckCircle2, Fuel, Gauge, MapPin, Settings, Users } from "lucide-react";
import type { CarDetail } from "@/services/car.service";

type CarInfoProps = {
  car: CarDetail;
};

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-secondary-300 text-sm font-medium">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-secondary-500 text-base font-bold">{value}</p>
    </div>
  );
}

export default function CarInfo({ car }: CarInfoProps) {
  return (
    <section className="bg-card rounded-card p-6 lg:p-8 flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-secondary-500 text-2xl lg:text-3xl font-bold leading-tight">
          {car.make} {car.modelName}
        </h1>
        <p className="text-secondary-300 text-sm font-medium">
          {car.carType} • {car.year}
        </p>
        <p className="flex items-center gap-1.5 text-secondary-300 text-sm font-medium">
          <MapPin size={16} strokeWidth={2} />
          <span>{car.location}</span>
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Spec
          icon={<Fuel size={16} strokeWidth={2} />}
          label="Yakıt Türü"
          value={car.fuelType}
        />
        <Spec
          icon={<Settings size={16} strokeWidth={2} />}
          label="Vites"
          value={car.transmission}
        />
        <Spec
          icon={<Users size={16} strokeWidth={2} />}
          label="Koltuk"
          value={`${car.seats} Kişi`}
        />
        <Spec
          icon={<Gauge size={16} strokeWidth={2} />}
          label="Kilometre"
          value={`${car.mileage.toLocaleString("tr-TR")} km`}
        />
      </div>

      {car.description && (
        <div className="flex flex-col gap-2">
          <h2 className="text-secondary-500 text-base font-bold">Açıklama</h2>
          <p className="text-secondary-400 text-sm leading-6">{car.description}</p>
        </div>
      )}

      {car.features?.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-secondary-500 text-base font-bold">Özellikler</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {car.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-secondary-400 text-sm font-medium"
              >
                <CheckCircle2
                  size={18}
                  strokeWidth={2}
                  className="text-emerald-500 shrink-0"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}