import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FavoriteTeamPicker } from "@/components/teams/FavoriteTeamPicker";

describe("FavoriteTeamPicker", () => {
  it("calls onChange when selecting a team", () => {
    const onChange = vi.fn();
    render(
      <FavoriteTeamPicker
        teams={["阿根廷", "巴西"]}
        value="阿根廷"
        onChange={onChange}
        onClear={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByDisplayValue("阿根廷"), {
      target: { value: "巴西" },
    });

    expect(onChange).toHaveBeenCalledWith("巴西");
  });
});
