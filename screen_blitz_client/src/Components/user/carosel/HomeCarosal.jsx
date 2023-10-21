import { Carousel } from "@material-tailwind/react";

export function HomeCarosal(props) {
  return (
    <Carousel transition={{ duration: 2 }} className="rounded-none">
      {props.banners?.length ? (
        props.banners.map((data, index) => (
          <img
            key={index}
            src={data.bannerImage}
            alt="bannerImage"
            className="h-full w-full object-cover"
          />
        ))
      ) : (
        <img
          src="https://res.cloudinary.com/arjun-cloud-storage/image/upload/v1697454817/SB-banner-Pics/image-1697454810308-366121.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
      )}
    </Carousel>
  );
}
