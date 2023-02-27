/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import NextLink from 'next/link';
import cn from 'classnames';
import ButtonLink from 'components/ButtonLink';
import {ExternalLink} from 'components/ExternalLink';
import {IconFacebookCircle} from 'components/Icon/IconFacebookCircle';
import {IconTwitter} from 'components/Icon/IconTwitter';
import {IconGitHub} from 'components/Icon/IconGitHub';
import {IconNavArrow} from 'components/Icon/IconNavArrow';

export function Footer() {
  const socialLinkClasses = 'hover:text-primary dark:text-primary-dark';
  return (
    <>
      <div className="self-stretch w-full">
        <div className="mx-auto w-full px-5 sm:px-12 md:px-12 pt-10 md:pt-12 lg:pt-10">
          <hr className="max-w-7xl mx-auto border-border dark:border-border-dark" />

          <hr className="max-w-7xl mx-auto border-border dark:border-border-dark" />
        </div>
        <footer className="text-secondary dark:text-secondary-dark py-12 px-5 sm:px-12 md:px-12 sm:py-12 md:py-16 lg:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-x-12 gap-y-8 max-w-7xl mx-auto ">
            <div className="flex flex-col">
              <FooterLink href="/plan" isHeader={true}>
                Plan de cours
              </FooterLink>
              <FooterLink href="/setup">Installation</FooterLink>
              <FooterLink href="/formations ">Formations</FooterLink>
            </div>
            <div className="flex flex-col">
              <FooterLink href="/reference/" isHeader={true}>
                References
              </FooterLink>
              <FooterLink href="/reference/aide-memoire">
                Aide-Mémoire
              </FooterLink>
            </div>
            <div className="flex flex-col sm:col-start-2 xl:col-start-4"></div>
            <div className="flex flex-col"></div>
          </div>
        </footer>
      </div>
    </>
  );
}

function FooterLink({
  href,
  children,
  isHeader = false,
}: {
  href?: string;
  children: React.ReactNode;
  isHeader?: boolean;
}) {
  const classes = cn('border-b inline-block border-transparent', {
    'text-sm text-primary dark:text-primary-dark': !isHeader,
    'text-md text-secondary dark:text-secondary-dark my-2 font-bold': isHeader,
    'hover:border-gray-10': href,
  });

  if (!href) {
    return <div className={classes}>{children}</div>;
  }

  if (href.startsWith('https://')) {
    return (
      <div>
        <ExternalLink href={href} className={classes}>
          {children}
        </ExternalLink>
      </div>
    );
  }

  return (
    <div>
      <NextLink href={href}>
        <a className={classes}>{children}</a>
      </NextLink>
    </div>
  );
}
