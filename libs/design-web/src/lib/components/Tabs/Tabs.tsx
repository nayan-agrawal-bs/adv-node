import { Tab } from '@headlessui/react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { useState } from 'react';

export interface TabProps {
  name: string;
  icon?: string;
  children: React.ReactNode;
  onClick?: (name: string) => void;
}

export interface TabsProps {
  className?: string;
  style?: React.CSSProperties;
  tabs: TabProps[];
}

export const Tabs: React.FC<TabsProps> = ({
  className,
  style,
  tabs,
}: TabsProps) => {
  const [hoveredTab, setHoveredTab] = useState<string>('');

  return (
    <div>
      <Tab.Group>
        <Tab.List className="mt-3 flex flex-wrap justify-evenly lg:justify-start gap-x-4 md:gap-x-4 sm:gap-x-4 lg:border-b font-bold border-white-light sm:px-0 xs:pb-4 sm:pb-6 md:pb- lg:pb-0 pb-0 dark:border-[#191E3A]">
          {tabs.map((tab, index) => (
            <Tab key={`${tab.name}-${index}`}>
              {({ selected }) => (
                <div
                  key={tab.name}
                  onClick={() => tab.onClick && tab.onClick(tab.name)}
                  onMouseEnter={() => setHoveredTab(tab.name)}
                  onMouseLeave={() => setHoveredTab('')}
                  className={`${
                    selected
                      ? 'border-b !border-secondary text-secondary !outline-none'
                      : ''
                  } -mb-[1px] flex items-center justify-evenly space-x-5  sm:space-x-0 text-[#717171] border-transparent md:px-1 md:py-3 before:inline-block hover:border-b hover:!border-secondary hover:text-secondary`}
                >
                  {tab.icon && (
                    <Icon
                      name={tab.icon}
                      isHovered={selected || hoveredTab === tab.name}
                      // height={16}
                      // width={16}
                      className="h-[1.875rem] w-[1.875rem] sm:h-[1rem] sm:w-[1rem]"
                    />
                  )}
                  &nbsp;<div className="hidden sm:block">{tab.name}</div>
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, index) => (
            <Tab.Panel key={`${tab.name}-${index}`}>
              <div className="active pt-5 w-full">{tab.children}</div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
