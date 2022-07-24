import { useState } from "react";
import { Burger } from "@mantine/core";

export default function Hamburger() {
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";

  return (
    <Burger
      opened={opened}
      onClick={() => setOpened((o) => !o)}
      title={title}
    />
  );
}
