'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Eiger Tomahawk Roll Strap Black Sandal - Black",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910005568001-tomahawk-roll-strap-black-blk.02.jpg",
          price: 224100,
          stock: 100,
          description:
            "Tomahawk Roll Strap Black adalah sandal palang serbaguna untuk keseharian dan berkegiatan di sekitar base camp. Outsole berbahan rubber menyediakan grip baik untuk permukaan di alam terbuka. Tali di bagian belakang sandal ini dapat dilepas pasang sesuai selera, sehingga Anda bisa menggunakannya sebagai sandal slip on.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Millerton NR Jacket - Orange",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910004731o_1.jpg",
          price: 580500,
          stock: 100,
          description:
            "Jaket Eiger Millerton NR adalah jaket windproof dan fungsional yang cocok digunakan untuk kegiatan luar ruang maupun beraktivitas sehari-hari.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Eminence Jacket - Navy",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910004607d_1.jpg",
          price: 1000,
          stock: 100,
          description:
            "Jaket Eminence adalah jaket penghangat dan tahan angin yang cocok digunakan untuk kegiatan luar ruang maupun beraktivitas seharihari.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Ugimba Roll Pattern 4 Sandals - Blue",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910004988b_1.jpg",
          price: 160300,
          stock: 100,
          description:
            "Ugimba Roll Pattern 4 adalah sandal jepit berdaya tahan kuat untuk pemakaian harian dan saat berkegiatan di sekitar base camp.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Reguler Travel Pouch 3L - Black",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/7/3/736001tn_1.jpg",
          price: 134100,
          stock: 100,
          description:
            "Reguler Travel Pouch dapat digunakan dengan nyaman untuk travelling atau sehari-hari.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Stover 4P Tent - Red",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910004892001-stover-4p-red-nos.10.jpg",
          price: 1960000,
          stock: 100,
          description:
            "Stover 4P adalah tenda kemah untuk kapasitas 4 orang yang cocok digunakan untuk kegiatan berkemah dan hiking. ",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Baluran 2P Tent - Orange",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910004588002_1.jpg",
          price: 15750000,
          stock: 100,
          description:
            "Tenda Baluran 2P adalah tenda kemah berkapasitas dua orang yang dapat dipasang di atap mobil, khususnya mobil jenis 4X4 atau 4WD.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Windnest Double Hammock - Green",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910003322002_1.jpg",
          price: 535500,
          stock: 100,
          description: "Eiger Windnest Double Hammock - Green",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Lake Side Sleeping Bag - Green",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910003821001_3_1.jpg",
          price: 422100,
          stock: 100,
          description:
            "Bagi Anda penggemar kegiatan outdoor, kantong tidur (sleeping bag) adalah salah satu kebutuhan utama yang tidak boleh dilewatkan.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Sleep Sack 600 - Blue",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910003700001-1.jpg",
          price: 449100,
          stock: 100,
          description:
            "Bagi Anda penggemar kegiatan outdoor, kantong tidur (sleeping bag) adalah salah satu kebutuhan utama yang tidak boleh dilewatkan.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Axial Pro Headlamp - Orange",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910004422001_2.jpg",
          price: 224100,
          stock: 100,
          description:
            "Axial Pro adalah perlengkapan penting bagi para petualang luar ruang.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Dimme Lantern - Green",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910003284_1_1.jpg",
          price: 215100,
          stock: 100,
          description:
            "Dimme adalah lentera elektrik yang ringkas dan mudah digunakan.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Hazra Cup 300mL - Dark Grey",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910005126002-hazra-dgr-nos.01.jpg",
          price: 152100,
          stock: 100,
          description:
            "Mug Hazra dirancang untuk menemani Anda saat berkemah, traveling, maupun berkegiatan sehari-hari. Terbuat dari bahan stainless steel,",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Hydration Bladder 2L",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/1/_/1_141_114.jpg",
          price: 225000,
          stock: 100,
          description:
            "Dengan kapasitas 2L, produk ini cocok sekali digunakan ketika anda beraktivitas outdoor.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Dawson Water Bottle 600ml - Olive",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910004930-dawson-oli.01.jpg",
          price: 134100,
          stock: 100,
          description:
            "Dawson adalah botol minum yang cocok digunakan untuk menemani Anda saat berkemah, traveling, maupun berkegiatan sehari-hari.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Micro Mosquito Net - Black",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910003608001-1.jpg",
          price: 128700,
          stock: 100,
          description:
            "Berkegiatan di hutan hujan tropis tidak bisa dilepaskan dari masalah nyamuk atau serangga.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Eurus Compass - Black",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910003769001_1.jpg",
          price: 122500,
          stock: 100,
          description:
            "Eurus Compass adalah salah satu perlengkapan luar ruang yang sangat berguna bagi para petualang.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Hades Kettle - Grey",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/e/q/equipment_-_hades_kettle_-_1.png",
          price: 220500,
          stock: 100,
          description:
            "Hades Kettle adalah ceret berbahan aluminium berkualitas yang berukuran praktis sehingga memudahkan Anda untuk membawanya saat melakukan kegiatan camping.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Crew Cook Set 3 - Silver",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910003521_-_crew_cook_set_3_-_stainless-1.jpg",
          price: 227700,
          stock: 100,
          description:
            "Crew Cook Set 3 adalah alat masak serbaguna yang terbuat dari bahan aluminium berkualitas.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Camp Chair - Black",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910003525001-1.jpg",
          price: 521100,
          stock: 100,
          description:
            "Camp Chair Eiger adalah kursi kemping portabel yang ringkas, ringan, dan nyaman digunakan untuk bersantai saat melakukan kegiatan outdoor seperti berkemah, memancing, traveling, dan hiking. ",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Javelin Trekking Pole - Orange",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910004712001_1.jpg",
          price: 495000,
          stock: 100,
          description:
            "Trekking pole Javelin adalah perlengkapan penting bagi para hiker dan pendaki gunung.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Eiger Folding Shovel - Silver",
          image_url:
            "https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910003682001-1.jpg",
          price: 76500,
          stock: 100,
          description:
            "Folding shovel adalah sekop lipat yang ringan namun kuat untuk menggali lubang kecil atau lubang api selama Anda berkemah atau berkegiatan di luar ruangan, dan mungkin merupakan alternatif yang baik untuk alat berkebun.",
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Products', null, {});
  }
};
