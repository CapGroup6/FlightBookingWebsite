import * as React from "react";

function BackgroundPicture() {
  return (
    <>
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ea9e22b518952ca85ede67ca402caa20ef90ed6ece6b107e7d827bc7beb203a9?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea9e22b518952ca85ede67ca402caa20ef90ed6ece6b107e7d827bc7beb203a9?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea9e22b518952ca85ede67ca402caa20ef90ed6ece6b107e7d827bc7beb203a9?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea9e22b518952ca85ede67ca402caa20ef90ed6ece6b107e7d827bc7beb203a9?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea9e22b518952ca85ede67ca402caa20ef90ed6ece6b107e7d827bc7beb203a9?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea9e22b518952ca85ede67ca402caa20ef90ed6ece6b107e7d827bc7beb203a9?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea9e22b518952ca85ede67ca402caa20ef90ed6ece6b107e7d827bc7beb203a9?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea9e22b518952ca85ede67ca402caa20ef90ed6ece6b107e7d827bc7beb203a9?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
        className="img"
      />
      <style jsx>{`
        .img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      `}</style>
    </>
  );
}

export default BackgroundPicture;
