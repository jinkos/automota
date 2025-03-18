import { Link } from 'react-router-dom'

import gitHubImg from '../assets/github-mark.svg';

export default function GithubLink() {
    return (
        <Link
            to="https://github.com/jinkos/automota"
            target='_blank'
        >
            <img src={gitHubImg} alt="GitHubLink" height="50" />
        </Link>
    )
}
