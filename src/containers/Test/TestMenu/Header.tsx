import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  useScrollTrigger,
} from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import MenuIcon from '@material-ui/icons/Menu'

export interface TestMenuHeaderProps {
  handleNavDrawerToggle: () => void
}

export default function TestMenuHeader({
  handleNavDrawerToggle,
}: TestMenuHeaderProps): JSX.Element {
  const handleOpenSlideMenu = function(): void {
    handleNavDrawerToggle()
  }

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleOpenSlideMenu}
            >
              <MenuIcon />
            </IconButton>
            <Box clone flexGrow={1} pl={1}>
              <Typography component="h2" variant="h6">
                <FormattedMessage
                  id="test.testMenu.header.txtTitle"
                  defaultMessage="专项练习"
                />
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* fix position="fixed" */}
      <Toolbar />
    </>
  )
}

export interface ElevationScrollProps {
  children: React.ReactElement
}

export function ElevationScroll({
  children,
}: ElevationScrollProps): JSX.Element {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, { elevation: trigger ? 4 : 0 })
}
