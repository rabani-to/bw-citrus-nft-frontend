import * as React from 'react'

export const NFTCode: React.FC<
  Readonly<{
    code: string
  }>
> = ({ code }) => (
  <div>
    <h2>Use this code to claim your Lemon NFT</h2>
    <div
      style={{
        background: 'black',
        color: 'white',
        padding: '0.5em 1em',
        borderRadius: '5px',
        fontSize: '1.25em',
        maxWidth: 'fit-content'
      }}
    >
      <code>{code}</code>
    </div>
    <br />
    <br />
    <small>
      Ignore this message if you are not claiming your NFT at the moment.
    </small>
  </div>
)

export const NewFollower: React.FC<
  Readonly<{
    username: string
    count: number
  }>
> = ({ username, count }) => (
  <div>
    <h2>
      🎉🎉 Hurrah!{' '}
      <a target='_blank' href={`https://beta.lemon.tips/profile/${username}`}>
        @{username}
      </a>{' '}
      is now following you.
    </h2>
    <p>
      A total of <strong>{count}</strong> people is now following you. You can
      follow them back by visiting their profile page on Lemon.
    </p>
    <br />
    <br />
    <small>
      Ignore this message if you are not interested in following back.
    </small>
  </div>
)