import React from 'react'
import { TinaCMS } from 'tinacms'
import { Client, TinaCloudAuthWall } from 'tina-graphql-gateway'

const TinaWrapper = ({ children }) => {
  const cms = React.useMemo(() => {
    return new TinaCMS({
      apis: {
        tina: new Client({
          organizationId: 'frank',
          clientId: '1k14v6r0khmoei8jfj5l4tr3i',
          branch: 'main',
        }),
      },
      sidebar: true,
      enabled: true,
    })
  }, [])

  return <TinaCloudAuthWall cms={cms}>{children}</TinaCloudAuthWall>
}

export default TinaWrapper