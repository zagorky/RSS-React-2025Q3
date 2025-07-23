import type { ApiResponseType } from '~types/types';

export const emptyResponse: ApiResponseType = {
  pagination: {
    last_visible_page: 1,
    has_next_page: false,
    current_page: 1,
    items: {
      count: 0,
      total: 0,
      per_page: 25,
    },
  },
  data: [],
};

export const emptyQueryResponse = {
  pagination: {
    last_visible_page: 1154,
    has_next_page: true,
    current_page: 1,
    items: {
      count: 25,
      total: 28834,
      per_page: 25,
    },
  },
  data: [
    {
      mal_id: 1,
      score: 8.37,
      airing: false,
      url: 'https://myanimelist.net/anime/1/Cowboy_Bebop',
      images: {
        jpg: {
          image_url: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/4/19644t.jpg',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/4/19644l.jpg',
        },
        webp: {
          image_url: 'https://cdn.myanimelist.net/images/anime/4/19644.webp',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/4/19644t.webp',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/4/19644l.webp',
        },
      },
      title: 'HUH Cowboy Bebop',
      type: 'TV',
      synopsis:
        "Crime is timeless. By the year 2071, humanity has expanded across the galaxy, filling the surface of other planets with settlements like those on Earth. These new societies are plagued by murder, drug use, and theft, and intergalactic outlaws are hunted by a growing number of tough bounty hunters.nnSpike Spiegel and Jet Black pursue criminals throughout space to make a humble living. Beneath his goofy and aloof demeanor, Spike is haunted by the weight of his violent past. Meanwhile, Jet manages his own troubled memories while taking care of Spike and the Bebop, their ship. The duo is joined by the beautiful con artist Faye Valentine, odd child Edward Wong Hau Pepelu Tivrusky IV, and Ein, a bioengineered Welsh corgi.nnWhile developing bonds and working to catch a colorful cast of criminals, the Bebop crew's lives are disrupted by a menace from Spike's past. As a rival's maniacal plot continues to unravel, Spike must choose between life with his newfound family or revenge for his old wounds.nn[Written by MAL Rewrite]",
      genres: [
        {
          mal_id: 1,
          type: 'anime',
          name: 'Action',
          url: 'https://myanimelist.net/anime/genre/1/Action',
        },
        {
          mal_id: 46,
          type: 'anime',
          name: 'Award Winning',
          url: 'https://myanimelist.net/anime/genre/46/Award_Winning',
        },
        {
          mal_id: 24,
          type: 'anime',
          name: 'Sci-Fi',
          url: 'https://myanimelist.net/anime/genre/24/Sci-Fi',
        },
      ],
    },
    {
      mal_id: 5,
      url: 'https://myanimelist.net/anime/5/Cowboy_Bebop__Tengoku_no_Tobira',
      images: {
        jpg: {
          image_url: 'https://cdn.myanimelist.net/images/anime/1439/93480.jpg',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/1439/93480t.jpg',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/1439/93480l.jpg',
        },
        webp: {
          image_url: 'https://cdn.myanimelist.net/images/anime/1439/93480.webp',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/1439/93480t.webp',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/1439/93480l.webp',
        },
      },
      trailer: {
        youtube_id: null,
        url: null,
        embed_url: null,
        images: {
          image_url: null,
          small_image_url: null,
          medium_image_url: null,
          large_image_url: null,
          maximum_image_url: null,
        },
      },
      title: 'HUH Cowboy Bebop: Tengoku no Tobira',
      type: 'Movie',
      synopsis:
        'Another day, another bountyu2014such is the life of the often unlucky crew of the Bebop. However, this routine is interrupted when Faye, who is chasing a fairly worthless target on Mars, witnesses an oil tanker suddenly explode, causing mass hysteria. As casualties mount due to a strange disease spreading through the smoke from the blast, a whopping three hundred million woolong price is placed on the head of the supposed perpetrator.nnWith lives at stake and a solution to their money problems in sight, the Bebop crew springs into action. Spike, Jet, Faye, and Edward, followed closely by Ein, split up to pursue different leads across Alba City. Through their individual investigations, they discover a cover-up scheme involving a pharmaceutical company, revealing a plot that reaches much further than the ragtag team of bounty hunters could have realized.nn[Written by MAL Rewrite]',
      genres: [
        {
          mal_id: 1,
          type: 'anime',
          name: 'Action',
          url: 'https://myanimelist.net/anime/genre/1/Action',
        },
        {
          mal_id: 24,
          type: 'anime',
          name: 'Sci-Fi',
          url: 'https://myanimelist.net/anime/genre/24/Sci-Fi',
        },
      ],
    },
    {
      mal_id: 6,
      score: 8.37,
      airing: false,
      url: 'https://myanimelist.net/anime/6/Trigun',
      images: {
        jpg: {
          image_url: 'https://cdn.myanimelist.net/images/anime/1130/120002.jpg',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/1130/120002t.jpg',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/1130/120002l.jpg',
        },
        webp: {
          image_url:
            'https://cdn.myanimelist.net/images/anime/1130/120002.webp',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/1130/120002t.webp',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/1130/120002l.webp',
        },
      },
      title: 'HUH Trigun',
      type: 'TV',
      synopsis: `Vash the Stampede is the man with a $$60,000,000,000 bounty on his head. The reason: he's a merciless villain who lays waste to all those that oppose him and flattens entire cities for fun, garnering him the title "The Humanoid Typhoon." He leaves a trail of death and destruction wherever he goes, and anyone can count themselves dead if they so much as make eye contactu2014or so the rumors say. In actuality, Vash is a huge softie who claims to have never taken a life and avoids violence at all costs.nnWith his crazy doughnut obsession and buffoonish attitude in tow, Vash traverses the wasteland of the planet Gunsmoke, all the while followed by two insurance agents, Meryl Stryfe and Milly Thompson, who attempt to minimize his impact on the public. But soon, their misadventures evolve into life-or-death situations as a group of legendary assassins are summoned to bring about suffering to the trio. Vash's agonizing past will be unraveled and his morality and principles pushed to the breaking point.nn[Written by MAL Rewrite]`,
      genres: [
        {
          mal_id: 1,
          type: 'anime',
          name: 'Action',
          url: 'https://myanimelist.net/anime/genre/1/Action',
        },
        {
          mal_id: 2,
          type: 'anime',
          name: 'Adventure',
          url: 'https://myanimelist.net/anime/genre/2/Adventure',
        },
        {
          mal_id: 24,
          type: 'anime',
          name: 'Sci-Fi',
          url: 'https://myanimelist.net/anime/genre/24/Sci-Fi',
        },
      ],
    },
    {
      mal_id: 7,
      url: 'https://myanimelist.net/anime/7/Witch_Hunter_Robin',
      images: {
        jpg: {
          image_url: 'https://cdn.myanimelist.net/images/anime/10/19969.jpg',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/10/19969t.jpg',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/10/19969l.jpg',
        },
        webp: {
          image_url: 'https://cdn.myanimelist.net/images/anime/10/19969.webp',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/10/19969t.webp',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/10/19969l.webp',
        },
      },
      title: 'HUH Witch Hunter Robin',
      type: 'TV',
      score: 8.37,
      airing: false,
      synopsis:
        "Though hidden away from the general public, Witchesu2014those with supernatural powersu2014have always existed in human societies. Neither numerous nor inherently evil, Witches are nonetheless capable of creating disorder by misusing their powers for criminal means. The task of solving supernatural crimes falls outside of the jurisdiction of normal authorities and is instead handled by the Solomon organization.nnHaving finished her training in Italy, Robin Sena transfers to Solomon's local Japanese branch, STNJ. Possessing powerful pyrokinetic abilities, she is herself a Witch, putting her at odds with STNJ's methods of dealing with rogue Witches. In particular, Robin opposes the use of an elixir called Orbo, which can weaken or even neutralize a Witch's powers. If Robin wants to find her place within the organization, she must find a way to navigate the internal politics of Solomon while also handling the threat of hostile Witchesu2014but both seem to be dangerous for very different reasons.nn[Written by MAL Rewrite]",
      genres: [
        {
          mal_id: 1,
          type: 'anime',
          name: 'Action',
          url: 'https://myanimelist.net/anime/genre/1/Action',
        },
        {
          mal_id: 8,
          type: 'anime',
          name: 'Drama',
          url: 'https://myanimelist.net/anime/genre/8/Drama',
        },
        {
          mal_id: 7,
          type: 'anime',
          name: 'Mystery',
          url: 'https://myanimelist.net/anime/genre/7/Mystery',
        },
        {
          mal_id: 37,
          type: 'anime',
          name: 'Supernatural',
          url: 'https://myanimelist.net/anime/genre/37/Supernatural',
        },
      ],
    },
  ],
};

export const specificQueryResponse: ApiResponseType = {
  pagination: {
    last_visible_page: 1,
    has_next_page: false,
    current_page: 1,
    items: {
      count: 4,
      total: 4,
      per_page: 25,
    },
  },
  data: [
    {
      mal_id: 52991,
      score: 8.37,
      airing: false,
      url: 'https://myanimelist.net/anime/52991/Sousou_no_Frieren',
      images: {
        jpg: {
          image_url: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/1015/138006t.jpg',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
        },
        webp: {
          image_url:
            'https://cdn.myanimelist.net/images/anime/1015/138006.webp',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/1015/138006t.webp',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/1015/138006l.webp',
        },
      },
      title: 'HUH Sousou no Frieren',
      type: 'tv',
      synopsis: `During their decade-long quest to defeat the Demon King, the members of the hero's partyu2014Himmel himself, the priest Heiter, the dwarf warrior Eisen, and the elven mage Frierenu2014forge bonds through adventures and battles, creating unforgettable precious memories for most of them.nnHowever, the time that Frieren spends with her comrades is equivalent to merely a fraction of her life, which has lasted over a thousand years. When the party disbands after their victory, Frieren casually returns to her "usual" routine of collecting spells across the continent. Due to her different sense of time, she seemingly holds no strong feelings toward the experiences she went through.nnAs the years pass, Frieren gradually realizes how her days in the hero's party truly impacted her. Witnessing the deaths of two of her former companions, Frieren begins to regret having taken their presence for granted; she vows to better understand humans and create real personal connections. Although the story of that once memorable journey has long ended, a new tale is about to begin.nn[Written by MAL Rewrite]`,
      genres: [
        {
          mal_id: 2,
          type: 'anime',
          name: 'Adventure',
          url: 'https://myanimelist.net/anime/genre/2/Adventure',
        },
        {
          mal_id: 8,
          type: 'anime',
          name: 'Drama',
          url: 'https://myanimelist.net/anime/genre/8/Drama',
        },
        {
          mal_id: 10,
          type: 'anime',
          name: 'Fantasy',
          url: 'https://myanimelist.net/anime/genre/10/Fantasy',
        },
      ],
    },
    {
      mal_id: 59978,
      score: 8.37,
      airing: false,
      url: 'https://myanimelist.net/anime/59978/Sousou_no_Frieren_2nd_Season',
      images: {
        jpg: {
          image_url: 'https://cdn.myanimelist.net/images/anime/1089/148301.jpg',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/1089/148301t.jpg',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/1089/148301l.jpg',
        },
        webp: {
          image_url:
            'https://cdn.myanimelist.net/images/anime/1089/148301.webp',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/1089/148301t.webp',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/1089/148301l.webp',
        },
      },
      title: 'HUH Sousou no Frieren 2nd Season',
      type: 'tv',
      synopsis: 'Second season of Sousou no Frieren.',
      genres: [
        {
          mal_id: 2,
          type: 'anime',
          name: 'Adventure',
          url: 'https://myanimelist.net/anime/genre/2/Adventure',
        },
        {
          mal_id: 8,
          type: 'anime',
          name: 'Drama',
          url: 'https://myanimelist.net/anime/genre/8/Drama',
        },
        {
          mal_id: 10,
          type: 'anime',
          name: 'Fantasy',
          url: 'https://myanimelist.net/anime/genre/10/Fantasy',
        },
      ],
    },
    {
      mal_id: 59978,
      score: 8.37,
      airing: false,
      url: 'https://myanimelist.net/anime/59978/Sousou_no_Frieren_2nd_Season',
      images: {
        jpg: {
          image_url: 'https://cdn.myanimelist.net/images/anime/1089/148301.jpg',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/1089/148301t.jpg',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/1089/148301l.jpg',
        },
        webp: {
          image_url:
            'https://cdn.myanimelist.net/images/anime/1089/148301.webp',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/1089/148301t.webp',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/1089/148301l.webp',
        },
      },
      title: 'HUH Sousou no Frieren 2nd Season',
      type: 'tv',
      synopsis: 'Second season of Sousou no Frieren.',
      genres: [
        {
          mal_id: 2,
          type: 'anime',
          name: 'Adventure',
          url: 'https://myanimelist.net/anime/genre/2/Adventure',
        },
        {
          mal_id: 8,
          type: 'anime',
          name: 'Drama',
          url: 'https://myanimelist.net/anime/genre/8/Drama',
        },
        {
          mal_id: 10,
          type: 'anime',
          name: 'Fantasy',
          url: 'https://myanimelist.net/anime/genre/10/Fantasy',
        },
      ],
    },
    {
      mal_id: 56885,
      score: 8.37,
      airing: false,
      url: 'https://myanimelist.net/anime/56885/Sousou_no_Frieren__u25CFu25CF_no_Mahou',
      images: {
        jpg: {
          image_url: 'https://cdn.myanimelist.net/images/anime/1045/150038.jpg',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/1045/150038t.jpg',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/1045/150038l.jpg',
        },
        webp: {
          image_url:
            'https://cdn.myanimelist.net/images/anime/1045/150038.webp',
          small_image_url:
            'https://cdn.myanimelist.net/images/anime/1045/150038t.webp',
          large_image_url:
            'https://cdn.myanimelist.net/images/anime/1045/150038l.webp',
        },
      },
      title: 'HUH Sousou no Frieren: u25CFu25CF no Mahou',
      type: 'ona',
      synopsis:
        "Frieren loves collecting peculiar spells, and her ever-growing arsenal of magic contains the perfect spells for many occasions. Whether it be by stealthily removing alcohol from Heiter's drinks or by remedying her own sleep issues, Frieren is sure to brighten her companions' days with her magic.nn[Written by MAL Rewrite]",
      genres: [
        {
          mal_id: 4,
          type: 'anime',
          name: 'Comedy',
          url: 'https://myanimelist.net/anime/genre/4/Comedy',
        },
        {
          mal_id: 10,
          type: 'anime',
          name: 'Fantasy',
          url: 'https://myanimelist.net/anime/genre/10/Fantasy',
        },
      ],
    },
  ],
};
