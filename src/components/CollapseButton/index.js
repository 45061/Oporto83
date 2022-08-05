import { useState } from "react";
import { Button, Collapse } from "@mantine/core";

export default function CollapseButton({ image, text, label, prismButton }) {
  const [opened, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen((o) => !o)}
        style={{ width: 100, height: 100, backgroundColor: "transparent" }}
      >
        {label}
        <img src={image} alt="icon button" />
      </Button>

      <Collapse
        in={opened}
        transitionDuration={800}
        transitionTimingFunction="linear"
      >
        {prismButton}
        {text}
      </Collapse>

      <style jsx>
        {`
          img {
            width: 100%;
            margin: 0;
          }
        `}
      </style>
    </>
  );
}
