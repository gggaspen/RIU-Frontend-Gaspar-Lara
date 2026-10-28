// forma de los héroes de https://akabab.github.io/superhero-api
export type HeroId = number;

export type HeroGender = 'Male' | 'Female' | '-';
export type HeroAlignment = 'good' | 'bad' | 'neutral' | '-';

export interface HeroPowerstats {
  readonly intelligence: number;
  readonly strength: number;
  readonly speed: number;
  readonly durability: number;
  readonly power: number;
  readonly combat: number;
}

export interface HeroAppearance {
  readonly gender: HeroGender;
  readonly race: string | null;
  readonly height: readonly [imperial: string, metric: string];
  readonly weight: readonly [imperial: string, metric: string];
  readonly eyeColor: string;
  readonly hairColor: string;
}

export interface HeroBiography {
  readonly fullName: string;
  readonly alterEgos: string;
  readonly aliases: readonly string[];
  readonly placeOfBirth: string;
  readonly firstAppearance: string;
  readonly publisher: string | null;
  readonly alignment: HeroAlignment;
}

export interface HeroWork {
  readonly occupation: string;
  readonly base: string;
}

export interface HeroConnections {
  readonly groupAffiliation: string;
  readonly relatives: string;
}

export interface HeroImages {
  readonly xs: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
}

export interface Hero {
  readonly id: HeroId;
  readonly name: string;
  readonly slug: string;
  readonly powerstats: HeroPowerstats;
  readonly appearance: HeroAppearance;
  readonly biography: HeroBiography;
  readonly work: HeroWork;
  readonly connections: HeroConnections;
  readonly images: HeroImages;
}

export type HeroPayload = Omit<Hero, 'id'>;
