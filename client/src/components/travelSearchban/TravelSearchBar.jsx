import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, addDays } from "date-fns";
import { CalendarIcon, BedIcon, UsersIcon, X, Minus, Plus } from "lucide-react";

const TravelSearchBar = () => {
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState();
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [isGuestPopoverOpen, setIsGuestPopoverOpen] = useState(false);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const age = [...Array(18).keys()];

  const clearLocation = () => {
    setLocation("");
  };
  const formatDateRange = () => {
    if (!dateRange?.from) return "Check-in date - Check-out date";
    if (!dateRange.to) return format(dateRange.from, "EEE dd MMM");
    return `${format(dateRange.from, "EEE dd MMM")} - ${format(
      dateRange.to,
      "EEE dd MMM"
    )}`;
  };

  const formatGuestText = () => {
    const parts = [];
    if (guests.adults > 0)
      parts.push(`${guests.adults} adult${guests.adults > 1 ? "s" : ""}`);
    if (guests.children > 0) {
      parts.push(`${guests.children} child${guests.children > 1 ? "ren" : ""}`);
    } else {
      parts.push(`${guests.children} children`);
    }
    parts.push(`${guests.rooms} room${guests.rooms > 1 ? "s" : ""}`);

    return parts.join(" • ");
  };

  const handleGuestChange = (type, increment) => {
    setGuests((prev) => {
      const newvalue = increment ? prev[type] + 1 : Math.max(0, prev[type] - 1);

      if (type === "adults" && newvalue < 1) return prev;
      if (type === "rooms" && newvalue < 1) return prev;

      return { ...prev, [type]: newvalue };
    });
  };

  const handleSearch = () => {
    console.log("Search params:", {
      location,
      dateRange,
      guests,
    });
    // Implement your search logic here
    // alert(
    //   `Searching for ${location} from ${formatDateRange()} for ${formatGuestText()}`
    // );
  };

  return (
    <>
      <div className="w-1/2 max-w-6xl mx-auto p-1 pb-3 rounded-md absolute top-28 bg-white">
        <div className="rounded-md flex items-center border-4 border-yellow-500 shadow-lg overflow-hidden ">
          {/* Location Input starts*/}
          <div className="flex items-center px-6 py-1 min-w-0 flex-1">
            <BedIcon className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
            <div className="flex items-center w-full">
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-0 p-0 font-normal text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Where are you going?"
              />
              {location && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearLocation}
                  className="ml-2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4 text-black" />
                </Button>
              )}
            </div>
          </div>
          {/* Location Input ends*/}
          {/* <Separator orientation="vertical" /> */}
          {/* Date picker */}
          <div className="flex items-center px-6 py-1 flex-1">
            <CalendarIcon className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
            <Popover
              open={isDatePopoverOpen}
              onOpenChange={setIsDatePopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-normal text-base justify-start hover:bg-transparent text-black"
                >
                  {formatDateRange()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  numberOfMonths={2}
                  selected={dateRange}
                  onSelect={setDateRange}
                  className="rounded-lg border shadow-sm"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Separator orientation="vertical" className="h-12 bg-gray-200" />
          {/* Guest Selector */}
          <div className="flex items-center px-6 py-1 flex-1">
            <UsersIcon className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
            <Popover
              open={isGuestPopoverOpen}
              onOpenChange={setIsGuestPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-normal text-black justify-start hover:bg-transparent "
                >
                  {formatGuestText()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                {/* adults */}
                <div className="space-y-4 mb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-normal">Adults</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGuestChange("adults", false)}
                        disabled={guests.adults <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{guests.adults}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGuestChange("adults", true)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* children */}
                <div className="space-y-4 mb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-normal">Children</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGuestChange("children", false)}
                        disabled={guests.children < 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{guests.children}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGuestChange("children", true)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {guests.children > 0 ? (
                  <div className="space-y-4 mb-2 text-xs">
                    <div className="w-full ">
                      <select
                        name="childAge[]"
                        id="childAge"
                        className="border-2 py-1 px-3 border-red-700"
                      >
                        <option value="">Age Needed</option>
                        {age.map((item, index) => (
                          <option value={item} key={index}>
                            {item} years old
                          </option>
                        ))}
                      </select>
                    </div>
                    <p>
                      To find you a place to stay that fits your entire group
                      along with correct prices, we need to know how old your
                      child will be at check-out
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {/* rooms */}
                <div className="space-y-4 mb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-normal">Rooms</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGuestChange("rooms", false)}
                        disabled={guests.rooms <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{guests.rooms}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGuestChange("rooms", true)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {/* Search button */}
          <Button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-md font-semibold h-full"
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
};

export default TravelSearchBar;
