import React from 'react';
import { ItalyFlag } from './icons/ItalyFlag';
import { JapanFlag } from './icons//JapanFlag';
import { MexicoFlag } from './icons/MexicoFlag';
import { IndiaFlag } from './icons//IndiaFlag';
import { GermanyFlag } from './icons/GermanyFlag';
import { FranceFlag } from './icons/FranceFlag';
import { BrazilFlag } from './icons/BrazilFlag';
import { CanadaFlag } from './icons/CanadaFlag';
import { IcelandFlag } from './icons/IcelandFlag';
import { SenegalFlag } from './icons/SenegalFlag';



const flagComponents = [
    MexicoFlag,
    JapanFlag,
    ItalyFlag,
    IndiaFlag,
    GermanyFlag,
    FranceFlag,
    BrazilFlag,
    CanadaFlag,
    IcelandFlag,
    SenegalFlag

];

// A single flag element wrapper
const Flag: React.FC<{ component: React.FC }> = ({ component: Component }) => (
  <div className="w-6 h-4 flex-shrink-0">
    <Component />
  </div>
);

// A horizontal strip of repeating, touching flags
export const HorizontalFlagStrip: React.FC = () => {
    const repeatedFlags = Array.from({ length: 150 }, (_, i) => flagComponents[i % flagComponents.length]);
    return (
        <div className="w-screen relative left-1/2 -translate-x-1/2">
            <div className="flex flex-row overflow-hidden bg-black">
                {repeatedFlags.map((FlagComponent, index) => (
                    <Flag key={index} component={FlagComponent} />
                ))}
            </div>
        </div>
    );
}

// A vertical strip of repeating, touching flags
export const VerticalFlagStrip: React.FC = () => {
    const repeatedFlags = Array.from({ length: 42 }, (_, i) => flagComponents[i % flagComponents.length]);
    return (
        <div className="flex flex-col overflow-hidden bg-black">
            {repeatedFlags.map((FlagComponent, index) => (
                <Flag key={index} component={FlagComponent} />
            ))}
        </div>
    );
}