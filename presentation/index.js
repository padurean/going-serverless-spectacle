// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  TableItem,
  TableRow,
  Table,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

import IoSocialOctocat from 'react-icons/lib/io/social-octocat';
import IoIosAlbums from 'react-icons/lib/io/ios-albums';

// Import custom component
import Interactive from "../assets/interactive";

import OggFacebookLogin from "../assets/components/ogg-facebook-login"

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  city: require("../assets/city.jpg"),
  kat: require("../assets/ogg.jpg"),
  ogg: require("../assets/ogg.jpg"),
  logo: require("../assets/formidable-logo.svg"),
  markdown: require("../assets/markdown.png")
};

preloader(images);

const themeColors = {
  primary: "#272727",
  // secondary: "#ea8800",
  secondary: "#D39F38",
  tertiary: "#ccc"
};
const theme = createTheme(themeColors);

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSetState(s) {
    this.setState(s);
  }
  handleGetState() {
    return this.state
  }

  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["fade", "zoom", "slide"]} transitionDuration={500}>
          <Slide transition={["slide"]} bgColor="primary">
            <Heading size={1} fit caps lineHeight={1} textColor="tertiary">
              Going Serverless
            </Heading>
            <Appear fid="1">
              <Heading size={1} fit caps textColor="secondary">
                AWS Lambda in Practice
              </Heading>
            </Appear>
            <Appear fid="2">
              <Text bold textColor="tertiary" margin="2rem 0 0 0">
                2-in-1: Presentation + TODO Demo App
              </Text>
            </Appear>
            <Appear fid="3">
              <Text bold textSize="2rem" textColor="tertiary" margin="2rem 0 0 0">
                  <Link textColor="secondary" href="https://facebook.github.io/react/" target="_blank"> React </Link>
                  &amp;
                  <Link textColor="secondary" href="https://formidable.com/open-source/spectacle/" target="_blank"> Spectacle </Link>
                  @ Front-end
              </Text>
            </Appear>
            <Appear fid="4">
              <Text bold textSize="2rem" textColor="tertiary">
                  <Link textColor="secondary" href="http://docs.aws.amazon.com/lambda/latest/dg/welcome.html" target="_blank"> AWS Lambdas </Link>
                  &amp;
                  <Link textColor="secondary" href="http://www.scala-lang.org/" target="_blank"> Scala </Link>
                  @ Back-end
              </Text>
            </Appear>
            <Appear fid="5">
              <Text bold textSize="2rem" margin="2rem 0 0 0">
                <Link href="https://github.com/padurean/going-serverless-spectacle" target="_blank" textColor="secondary"> <IoSocialOctocat style={{marginBottom: ".25rem"}} /> Source </Link>&nbsp;
                <Link href="http://purecore.ro/going-serverless-spectacle" textColor="secondary"> <IoIosAlbums style={{marginBottom: ".25rem"}} /> Live </Link>
              </Text>
            </Appear>
            <Heading size={5}>
              <OggFacebookLogin
                style={{lineHeight: "1.5rem"}}
                handleSetState={this.handleSetState.bind(this)}
                handleGetState={this.handleGetState.bind(this)} />
              {/*<Text textSize="1.5em" margin="20px 0px 0px" bold>Hit Your Right Arrow To Begin!</Text>*/}
            </Heading>
          </Slide>
          <Slide transition={["slide"]} notes="You can even put notes on your slide. How awesome is that?">
            <Image src={images.ogg.replace("/", "")} margin="0px auto 40px" height="293px"/>
            <Heading size={1} fit textColor="tertiary" textFont="primary">
              Ogg is working on it, just that he is so busy with his main job now ;)
            </Heading>
            <Text textSize="1em" textColor="secondary" caps bold>Stay tuned!</Text>
          </Slide>
          {/*
          <Slide transition={["zoom", "fade"]} bgColor="primary" notes="<ul><li>talk about that</li><li>and that</li></ul>">
            <CodePane
              lang="jsx"
              source={require("raw!../assets/deck.example")}
              margin="20px auto"
            />
          </Slide>
          <Slide transition={["slide"]} bgImage={images.city.replace("/", "")} bgDarken={0.75}>
            <Appear fid="1">
              <Heading size={1} caps fit textColor="primary">
                Full Width
              </Heading>
            </Appear>
            <Appear fid="2">
              <Heading size={1} caps fit textColor="tertiary">
                Adjustable Darkness
              </Heading>
            </Appear>
            <Appear fid="3">
              <Heading size={1} caps fit textColor="primary">
                Background Imagery
              </Heading>
            </Appear>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading caps fit>Flexible Layouts</Heading>
            <Layout>
              <Fill>
                <Heading size={4} caps textColor="secondary" bgColor="white" margin={10}>
                  Left
                </Heading>
              </Fill>
              <Fill>
                <Heading size={4} caps textColor="secondary" bgColor="white" margin={10}>
                  Right
                </Heading>
              </Fill>
            </Layout>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
            <BlockQuote>
              <Quote>Wonderfully formatted quotes</Quote>
              <Cite>Ken Wheeler</Cite>
            </BlockQuote>
          </Slide>
          <Slide transition={["spin", "zoom"]} bgColor="tertiary">
            <Heading caps fit size={1} textColor="primary">
              Inline Markdown
            </Heading>
            <Markdown>
              {`
![Markdown Logo](${images.markdown.replace("/", "")})

You can write inline images, [Markdown Links](http://commonmark.org), paragraph text and most other markdown syntax
* Lists too!
* With ~~strikethrough~~ and _italic_
* And lets not forget **bold**
              `}
            </Markdown>
          </Slide>
          <Slide transition={["slide", "spin"]} bgColor="primary">
            <Heading caps fit size={1} textColor="tertiary">
              Smooth
            </Heading>
            <Heading caps fit size={1} textColor="secondary">
              Combinable Transitions
            </Heading>
          </Slide>
          <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
            <List>
              <Appear><ListItem>Inline style based theme system</ListItem></Appear>
              <Appear><ListItem>Autofit text</ListItem></Appear>
              <Appear><ListItem>Flexbox layout system</ListItem></Appear>
              <Appear><ListItem>React-Router navigation</ListItem></Appear>
              <Appear><ListItem>PDF export</ListItem></Appear>
              <Appear><ListItem>And...</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="primary">
            <Heading size={1} caps fit textColor="tertiary">
              Your presentations are interactive
            </Heading>
            <Interactive/>
          </Slide>
          <Slide transition={["spin", "slide"]} bgColor="tertiary">
            <Heading size={1} caps fit lineHeight={1.5} textColor="primary">
              Made with love in Seattle by
            </Heading>
            <Link href="http://www.formidablelabs.com" target="_blank"><Image width="100%" src={images.logo}/></Link>
          </Slide>
          */}
        </Deck>
      </Spectacle>
    );
  }
}
