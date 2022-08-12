import { Popover, Text } from "@mantine/core";

export default function TogglePopover({ opened, children, onClose }) {
  // const { children, data } = props;
  // console.log("este es data", data);
  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      onClose={onClose}
    >
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">
          This is uncontrolled popover, it is opened when button is clicked
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
