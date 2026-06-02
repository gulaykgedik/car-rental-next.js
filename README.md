# Figma Tasarım Linki

- https://www.figma.com/design/1zRit2Y71mG9wO32pHg8dC/Car-Rent-Website-Design---Pickolab-Studio--Community-?node-id=1-6&p=f&t=DbDGJ7BwhutDbgK6-0

# Araç Fotoğraf API

- https://cdn.imagin.studio/getImage?customer={yourcustomerkey}&make=toyota&modelFamily=corolla&modelRange=corolla-gr&modelVariant=ha&modelYear=2023&powerTrain=petrol&angle=23&paintid=11272&paintDescription=vermillion-red&zoomtype=fullscreen
- customerkey: hrjavascript-mastert

# Prompts

# İlk Prompt

```jsx
I want you to create a MONGODB api on this Next.js typescript project that stores car information for my car rental project.
Endpoint should support filter, pagination and sorting.
Need 2 endpoints 1 for get all cars 1 for get car details by id.
Use right agent for this mission.
Example car data to be stored:
{
  make: "Alfa Romeo",
  modelName: "Giulia",
  year: 2024,
  transmission: "Otomatik",
  fuelType: "Benzin",
  seats: 5,
  doors: 4,
  pricePerDay: 3200,
  description:
    "İtalyan tutkusu performansla buluşuyor. Alfa Romeo Giulia; etkileyici tasarımı, hassas yol tutuşu ve sürüş keyfi sunar.",
  features: [
    "Spor Modu",
    "Harman Kardon Ses Sistemi",
    "Deri Spor Koltuklar",
    "Çift Bölgeli Klima",
    "Apple CarPlay",
    "Aktif Süspansiyon",
    "Performans Egzozu",
  ],
  location: "Miami",
  isAvailable: true,
  averageRating: 4.5,
  totalReviews: 63,
  mileage: 13400,
  color: "Rosso Kırmızı",
  licensePlate: "FL-ALFA9",
  carType: "Sedan",
}
```

# Anasayfa Promptu:

- Bu prompta sayfa görselleri dosya olarak ekle!!!!!!!!!!!!!!!!

```jsx
According to attached files.
Analyze the syling of the project.
Create tailwind variables for most used stlylings.
And create and style the home page of the project according to attached files.
Fetch car data from nextjs api.
We wont have favourite system because of it do not render heart on cards.
For car pictures use this imagin studios api to generate car pic:
- https://cdn.imagin.studio/getImage?customer={yourcustomerkey}&make=toyota&modelFamily=corolla&modelRange=corolla-gr&modelVariant=ha&modelYear=2023&powerTrain=petrol&angle=23&paintid=11272&paintDescription=vermillion-red&zoomtype=fullscreen
- customerkey: hrjavascript-mastery
```

# Listeleme Sayfası Promptu

- Bu prompta sayfa görselini dosya olarak ekle!

# Detay Sayfası Promptu

- Bu prompta sayfa görselini dosya olarak ekle!

# Authentication Prompt

```jsx
I want Authentication on this project.
Users should be able to register, login, logout.
Nextauth.js should be used in authentication.
We should support both email/password and google login.
We need login and sign up pages.
Header buttons should change based on authenticated user, if user is not authenticated he should see login and sign up buttons if he is authenticated then he should see ProfilePicture (if he doesnt have picture first letter of the name).
On register page we need first name, last name, email, phone, password, confirm password inputs
```

# Success & Cancel Prompt

```
Create success and cancel pages.
User auto navigates to these pages after checkout screen.
If checkout is done user navigate to success page if checkout is expired user navigates to cancel page.
When user navigates to these pages there is url params for shows whic order is paid or cancelled:
example url: http://localhost:3000/success?orderId=6a0061d691efd820d98ec810

```