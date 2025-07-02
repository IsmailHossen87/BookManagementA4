// src/components/Banner.tsx

export default function Banner() {
  return (
    <>
      <div
        className="h-[280px] my-7 md:h-[600px] w-full bg-cover bg-center animate-zoom-in-out rounded-2xl"
        style={{
          backgroundImage: "url('https://www.reganagency.com/wp-content/uploads/2023/10/Library-Management.jpg')",
        }}
      ></div>
    </>
  );
}
