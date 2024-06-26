import tarlan from '../assets/Tarlan.png';
import denis from '../assets/den.jpg';
import imruz from '../assets/imrus.png';
import stanislav from '../assets/stanislav.png';
import telman from '../assets/telman.png';
import pitman from '../assets/pitman.png';
import pavel from '../assets/pavel.png';


export type MockTeamArr = {
    img: string
    name: string
    exp: string
    about: string
};

export const teamMockArray: Array<MockTeamArr> = [
    {
        name: 'Tarlan Isaev',
        img: tarlan,
        exp: "Founder & CEO",
        about: "Former founder of IT Computers, Dev Ops, webdev, mobile dev, 17+ years of experience in IT industry. BCS Auckland, New Zealand, BEc Rybinsk, Russia"
    },
    {
        name: 'Denis Yarmoshko',
        img: denis,
        exp: "Frontend Engineer",
        about: "React frontend engineer. 1 year in development. Belarusian State Agrarian University"
    },
    {
        name: 'Imruz Babaeva',
        img: imruz,
        exp: "UI/UX Designer",
        about: "5+ years of experience in UI/UX design. Product Designer. Interested in B2C and B2B products, Streaming platforms, Health tech. Baku State University in Baku, Azerbaijan. "
    },
    {
        name: 'Stanislav Lisovskii',
        img: stanislav,
        exp: "Frontend Engineer",
        about: "React frontend engineer. 1 year in development. Belarusian State University of Physical culture and Sport in Minsk. "
    },
    {
        name: 'Telman Isaev',
        img: telman,
        exp: "Software tester",
        about: "CEO of IT Computers. Hardware repair,12+ years of experience in IT industry."
    },
    {
        name: 'Pavel Maslov',
        img: pavel,
        exp: "UI/UX Designer",
        about: "15+ years of experience in UI/UX design. Working with leading companies, has completed more than 500 projects in 12 years."
    },
    {
        name: 'Daniel Pitman',
        img: pitman,
        exp: "Food & Bio Expert",
        about: "Fascinated by microbiology and marine life since his youth. Studied a broad degree of biology with major in Marine Sciences and Ecology in Auckland, New Zealand."
    }
];

