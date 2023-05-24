<br/>
<p align="center">
  <h3 align="center">Image Generator</h3>

  <p align="center">
    Dall-e Image Generator Client using React Native
    <br/>
    <br/>
    <a href="https://github.com/manesjonathan/image-generator-react-native/issues">Report Bug</a>
    .
    <a href="https://github.com/manesjonathan/image-generator-react-native/issues">Request Feature</a>
  </p>

![Downloads](https://img.shields.io/github/downloads/manesjonathan/image-generator-react-native/total) ![Contributors](https://img.shields.io/github/contributors/manesjonathan/image-generator-react-native?color=dark-green) ![Forks](https://img.shields.io/github/forks/manesjonathan/image-generator?style=social) ![Stargazers](https://img.shields.io/github/stars/manesjonathan/image-generator-react-native?style=social) ![Issues](https://img.shields.io/github/issues/manesjonathan/image-generator-react-native)

## About The Project

![Screen Shot](demo.gif)

See [Image Generator API in ASP .NET](https://github.com/manesjonathan/image-generator-.NET)

### Built With
- React Native
- TypeScript
- Expo

## Getting Started
To get a local copy up and running follow these simple steps.

### Prerequisites
* npm
```sh
npm install npm@latest -g
```
* expo
```sh
npm install expo-cli --global
```
* oAuth via Google Cloud Platform
* Stripe account

### Installation

1. Clone the repo
```sh
git clone https://github.com/manesjonathan/image-generator-react-native.git
```
2. Go to the project folder
```sh
cd image-generator-react-native
```
3. Install NPM packages
```sh
npm install
```
4. Create a config.ts file in the utils folder and add the following code
```sh
export const URL:string = {API_URL};
export const WEB_CLIENT_ID: string = {Google Cloud App Client ID};
export const ANDROID_CLIENT_ID: string = {Google Cloud Android Client ID};
export const IOS_CLIENT_ID: string =  {Google Cloud iOS Client ID};
export const STRIPE_PK_TEST: string =  {Stripe PUBLIC_KEY};
```


3. Start the project
```sh
expo start
```

## Contributing

The following features are planned for the next release:
* Add a feature to rate the generated images

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/manesjonathan/image-generator/issues/new) to discuss it.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Authors

* [Jonathan Manes](https://github.com/manesjonathan/) - *Full Stack Developer*
