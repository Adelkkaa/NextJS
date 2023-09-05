export interface HintObject {
  hints: Hint[];
}

export interface Hint {
  term: string;
}

export interface RootObject {
  tracks: Track[];
}

export interface Track {
  artists: Artist[];
  hub: Hub;
  images: TrackImages;
  key: string;
  layout: string;
  share: Share;
  subtitle: string;
  title: string;
  type: TrackType;
  url: string;
}

export interface Artist {
  adamid: string;
  id: string;
}

export interface Hub {
  actions: Action[];
  displayname: Displayname;
  explicit: boolean;
  image: string;
  options: Option[];
  providers: Provider[];
  type: HubType;
}

export interface Action {
  id?: string;
  name?: Name;
  type: ActionType;
  uri?: string;
}

export enum Name {
  Apple = 'apple',
  HubApplemusicDeeplink = 'hub:applemusic:deeplink',
  HubDeezerSearchdeeplink = 'hub:deezer:searchdeeplink',
  HubSpotifySearchdeeplink = 'hub:spotify:searchdeeplink',
}

export enum ActionType {
  Applemusicopen = 'applemusicopen',
  Applemusicplay = 'applemusicplay',
  URI = 'uri',
}

export enum Displayname {
  AppleMusic = 'APPLE MUSIC',
}

export interface Option {
  actions: Action[];
  beacondata: Beacondata;
  caption: OptionCaption;
  colouroverflowimage: boolean;
  image: string;
  listcaption: Listcaption;
  overflowimage: string;
  providername: Providername;
  type: BeacondataType;
}

export interface Beacondata {
  providername: Providername;
  type: BeacondataType;
}

export enum Providername {
  Applemusic = 'applemusic',
  Itunes = 'itunes',
}

export enum BeacondataType {
  Buy = 'buy',
  Open = 'open',
}

export enum OptionCaption {
  Buy = 'BUY',
  Open = 'OPEN',
}

export enum Listcaption {
  BuyOnITunes = 'Buy on iTunes',
  OpenInAppleMusic = 'Open in Apple Music',
}

export interface Provider {
  actions: Action[];
  caption: ProviderCaption;
  images: ProviderImages;
  type: ProviderType;
}

export enum ProviderCaption {
  OpenInDeezer = 'Open in Deezer',
  OpenInSpotify = 'Open in Spotify',
}

export interface ProviderImages {
  default: string;
  overflow: string;
}

export enum ProviderType {
  Deezer = 'DEEZER',
  Spotify = 'SPOTIFY',
}

export enum HubType {
  Applemusic = 'APPLEMUSIC',
}

export interface TrackImages {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
}

export interface Share {
  avatar?: string;
  href: string;
  html: string;
  image: string;
  snapchat: string;
  subject: string;
  text: string;
  twitter: string;
}

export enum TrackType {
  Music = 'MUSIC',
}
