import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export const TimeToggle = ({
  selectedTimeframe,
  setSelectedTimeframe,
}: {
  selectedTimeframe: string;
  setSelectedTimeframe: (value: string) => void;
}) => {
  return (
    <ToggleGroup
      variant="outline"
      type="single"
      value={selectedTimeframe}
      onValueChange={(value) => {
        if (value === "") return;
        setSelectedTimeframe(value);
      }}
    >
      <ToggleGroupItem value="15m" aria-label="1 minute interval">
        15m
      </ToggleGroupItem>
      <ToggleGroupItem value="1h" aria-label="1 hour interval">
        1h
      </ToggleGroupItem>
      <ToggleGroupItem value="4h" aria-label="4 hours interval">
        4h
      </ToggleGroupItem>
      <ToggleGroupItem value="1d" aria-label="1 day interval">
        1d
      </ToggleGroupItem>
      <ToggleGroupItem value="1w" aria-label="1 week interval">
        1w
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
