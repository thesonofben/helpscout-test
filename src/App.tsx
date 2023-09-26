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
    "unknown user",
  );
  const [CustomerEmail, setCustomerEmail] = useState<string | undefined>(
    "unknown user",
  );
  const [status, setStatus] = useState<string | undefined>("unknown status");
  const [customerData, setCustomerData] = useState<string | undefined>(
    "Fetching data...",
  );

  const { user, conversation, customer } = useHelpScoutContext();

  useEffect(() => {
    setUserEmail(user?.firstName);
    setCustomerEmail(customer?.emails[0]?.value);
    setStatus(conversation?.status);

    if (CustomerEmail) {
      // Check if CustomerEmail is not undefined
      fetchData(CustomerEmail).then((data) => {
        setCustomerData(data?.country);
      });
    }
  }, [user, conversation, customer, CustomerEmail]); // Add CustomerEmail to the dependency array

  function onClick() {
    HelpScout.showNotification(
      NOTIFICATION_TYPES.SUCCESS,
      "Hello from the sidebar app",
    );
  }

  return (
    <div className="App" ref={appRef}>
      <DefaultStyle />
      <Heading level="h1">Hello, {userEmail} </Heading>
      <Text>
        The conversation is {status} for the customer with the email{" "}
        {CustomerEmail} --- {goegr()}
      </Text>
      <Text>Data --- {customerData}</Text>
 
      <Button size="sm" onClick={onClick}>
        Click me
      </Button>
    </div>
  );
}

export default App;

async function fetchData(CustomerEmail: string | undefined) {
  try {
    const options = {
      method: "post",
      body: JSON.stringify({ data: CustomerEmail }), // Send data as JSON string
    };
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyC3iuqH4FQLbzfkPkkpXN8kWBPaArCI1T1q4PfBHE3HQQjhss4-PIytyNDVRfHKxOx/exec",
      options,
    );

    if (!response.ok) {
      throw new Error("Response not OK");
    }

    const jsonData = await response.text();
    console.log(jsonData)
    return JSON.parse(jsonData);
  } catch (error) {
    return "error: ";
  }
}
 
function goegr() {
  return "hello this works";
}
