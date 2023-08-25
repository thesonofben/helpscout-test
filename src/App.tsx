import HelpScout, { NOTIFICATION_TYPES } from "@helpscout/javascript-sdk";
import {
  Button,
  DefaultStyle,
  Heading,
  useSetAppHeight,
  Text,
  useHelpScoutContext,
} from "@helpscout/ui-kit";
import { useEffect, useState } from "react";

function App() {
  const appRef = useSetAppHeight();

  const [userEmail, setUserEmail] = useState<string | undefined>(
    "unknown user"
  );
  const [CustomerEmail, setCustomerEmail] = useState<string | undefined>(
    "unknown user"
  );
  const [status, setStatus] = useState<string | undefined>("unknown status");
  const [fetchedData, setFetchedData] = useState<string | undefined>();

  const { user, conversation, customer } = useHelpScoutContext();

  useEffect(() => {
    setUserEmail(user?.firstName);
    setCustomerEmail(customer?.emails[0]?.value);
    setStatus(conversation?.status);

    if (CustomerEmail) {
      // Check if CustomerEmail is not undefined
      fetchData(CustomerEmail).then((data) => {
        setFetchedData(data.country);
      });
    }
  }, [user, conversation, customer]);

  function onClick() {
    HelpScout.showNotification(
      NOTIFICATION_TYPES.SUCCESS,
      "Hello from the sidebar app"
    );
  }

  return (
    <div className="App" ref={appRef}>
      <DefaultStyle />
      <Heading level="h1">Hello, {userEmail} </Heading>
      <Text>
        The conversation is {status} for the customer with the email{" "}
        {CustomerEmail} --- {fetchedData}--- {goegr()}
      </Text>

      <Button size="sm" onClick={onClick}>
        Click me
      </Button>
    </div>
  );
}

export default App;

async function fetchData(customerEmail: string) {
  try {
    const options = {
      method: "post",
      //followRedirects: true,
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify({ data: customerEmail }), // Send data as JSON string
    };
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzauu8KHNjvzw4oH2ZNOEBEnBigNjuCAsNoByRALukyFgLjRLGev7xt1_w0tY5WnJF-/exec",
      options
    );
    if (!response.ok) {
      throw new Error("Response not OK");
    }

      const jsonData = await response.json()
    return jsonData;
  } catch (error) {
    return "error: " + error;
  }
}

//fetchData();

function goegr() {
  return "hello";
}
