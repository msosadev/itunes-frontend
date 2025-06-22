import explicitImg from '../assets/Parental_Advisory_label.svg';

export default function ExplicitBadge() {
    return (<img src={explicitImg} className='max-w-14' alt="Explicit tag" />);
}