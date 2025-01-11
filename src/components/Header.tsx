/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { MdBatteryChargingFull, MdBatteryFull } from "react-icons/md"; // Battery icons
import { FiWifi, FiWifiOff } from "react-icons/fi"; // Wi-Fi icons
import { GiNetworkBars } from "react-icons/gi";

interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
  addEventListener(
    type: "levelchange" | "chargingchange",
    listener: (this: BatteryManager, ev: Event) => void
  ): void;
  removeEventListener(
    type: "levelchange" | "chargingchange",
    listener: (this: BatteryManager, ev: Event) => void
  ): void;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

interface BatteryStatus {
  level: string;
  charging: boolean;
}

// Styled components
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
`;

const Time = styled.span`
  font-weight: bold;
  color: rgb(53, 53, 53);
  white-space: nowrap;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  color: #ffa154;
  text-align: center;
  flex: 1;
`;

const StatusIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Icon = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: black;
`;

const Header: React.FC = () => {
  const [time, setTime] = useState<string>("");
  const [battery, setBattery] = useState<BatteryStatus>({ level: "100%", charging: true });
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Update time every minute
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Get battery status
  useEffect(() => {
    const navigatorWithBattery = navigator as NavigatorWithBattery;

    if (navigatorWithBattery.getBattery) {
      navigatorWithBattery.getBattery().then((batteryManager) => {
        const updateBatteryStatus = () => {
          setBattery({
            level: `${Math.round(batteryManager.level * 100)}%`,
            charging: batteryManager.charging,
          });
        };

        // Initial status
        updateBatteryStatus();

        // Add event listeners
        batteryManager.addEventListener("levelchange", updateBatteryStatus);
        batteryManager.addEventListener("chargingchange", updateBatteryStatus);

        // Cleanup listeners
        return () => {
          batteryManager.removeEventListener("levelchange", updateBatteryStatus);
          batteryManager.removeEventListener("chargingchange", updateBatteryStatus);
        };
      });
    }
  }, []);

  // Update network status
  useEffect(() => {
    const updateNetworkStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  return (
    <HeaderContainer>
      <Time>{time}</Time> {/* Time */}
      <Title>propsoch</Title> {/* Title */}
      <StatusIcons>
        {isOnline ? (
          <Icon>
            <GiNetworkBars />
          </Icon>
        ) : (
          <Icon>
            <GiNetworkBars />
          </Icon>
        )}

        {isOnline ? (
          <Icon>
            <FiWifi />
          </Icon>
        ) : (
          <Icon>
            <FiWifiOff />
          </Icon>
        )}

        {battery.charging ? (
          <Icon>
            <MdBatteryChargingFull />
          </Icon>
        ) : (
          <Icon>
            <MdBatteryFull />
          </Icon>
        )}
      </StatusIcons>
    </HeaderContainer>
  );
};

export default Header;
