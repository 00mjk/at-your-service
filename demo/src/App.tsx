import { useState, useEffect } from "react";
import { setupWorker, rest } from "msw";
import { Box, keyframes, Link, Icon, Heading, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import Requester from "./Requester";

// import { startAtYourService } from "at-your-service";
import { startAtYourService } from "../../src";

import logo from "./assets/logo.png";

const grow = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const LOCALHOST_API = "http://localhost:8080";
const SW_PATH = `${import.meta.env.BASE_URL}mockServiceWorker.js`;

const run = async () => {
  const worker = setupWorker(
    rest.get("http://localhost:8080/hello", (req, res, ctx) => {
      return res(
        ctx.delay(1500),
        ctx.status(202, "Mocked status"),
        ctx.json({
          message: "Mocked response JSON body",
        })
      );
    })
  );

  await window.navigator.serviceWorker.register(SW_PATH);

  worker.start({
    findWorker(scriptUrl) {
      return scriptUrl.includes("mockServiceWorker.js");
    },
  });

  if (window.navigator) {
    window.navigator.serviceWorker.ready.then(() => {
      startAtYourService({ registerWorker: false });
    });
  }
};

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    run();
  }, []);

  const click = () => {
    fetch(`${LOCALHOST_API}/hello`);
    // fetch(
    //   `${LOCALHOST_API}/requires/996a27ec-cdfb-4ca6-a458-e6f7a4870325/info?hi=aa`
    // );
    // fetch(
    //   `${LOCALHOST_API}/requires/996a27ec-cdfb-4ca6-a458-e6f7a4870325/info?hi=1`
    // );
    setCount(count + 1);
  };

  return (
    <Box
      width="100%"
      height="100vh"
      maxHeight="100vh"
      display="flex"
      flexFlow="column nowrap"
      overflow="hidden"
      position="relative"
    >
      <Box
        border="1px solid #001758"
        bg="#283F80"
        width="100%"
        maxHeight="64px"
        flex="1"
        display="flex"
        flexFlow="row nowrap"
        alignItems="center"
        justifyContent="center"
        padding="0 32px"
        color="white"
      >
        <Box marginRight="auto">
          <Heading as="h1" size="md">at-your-service</Heading>
        </Box>
        <Link
          href="https://github.com/AndrewWalsh/at-your-service"
          isExternal
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={4}
          color="white"
        >
          <Icon as={FaGithub} />
          <Text>
            {" GitHub "}
            <ExternalLinkIcon mx={2} paddingBottom="4px" />
          </Text>
        </Link>
      </Box>

      <Box
        width="100%"
        maxHeight="calc(100vh - 64px)"
        flex="1"
        alignItems="center"
        justifyContent="center"
        display="flex"
        position="relative"
      >
        <Box maxHeight="80%" width="80%" marginBottom="64px">
          <Requester />
        </Box>
      </Box>
      <Box
        position="absolute"
        border="1px solid #001758"
        bg="#283F80"
        borderRadius="50%"
        height="512px"
        width="512px"
        left="-200px"
        bottom="-400px"
        animation={`${grow} 0.5s ease-in`}
      ></Box>
    </Box>
  );
}

export default App;
