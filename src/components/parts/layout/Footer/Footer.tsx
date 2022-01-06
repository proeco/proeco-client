import { FC } from 'react';
import styled from 'styled-components';
import { Icon, Link } from '../../commons';
import { URLS } from '~/constants';

export const Footer: FC = () => {
  return (
    <StyledFooter className="w-100 pt-3 px-3 bg-light border-top border-secondary text-white">
      <div className="row mx-auto">
        <div className="col-9">
          <h5 className="mb-0 text-white">Proeco</h5>
          <ul className="ps-0">
            <li className="list-unstyled my-1" role="button">
              <Link href={URLS.TERM}>
                <a className="fw-bold text-white">利用規約</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-3 d-flex gap-3 justify-content-end">
          <Link href={URLS.PROECO_GITHUB_URL} target="_blank">
            <Icon size={24} icon="GITHUB" color="WHITE" />
          </Link>
          <Link href={URLS.TWITTER_URL} target="_blank">
            <Icon size={24} icon="TWITTER" color="WHITE" />
          </Link>
        </div>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  padding-bottom: 80px;
`;
