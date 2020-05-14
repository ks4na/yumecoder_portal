import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@material-ui/core'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { FormattedHTMLMessage } from 'react-intl'
import { useHistory } from 'react-router-dom'

export default function LoginPageHeader(): JSX.Element {
  const history = useHistory()
  const handleBack = function(): void {
    history.goBack()
  }
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={handleBack}
          >
            <ArrowBackIosOutlinedIcon />
          </IconButton>
          <Box clone flexGrow={1} pl={1}>
            <Typography component="h2" variant="h6">
              <FormattedHTMLMessage
                id="loginPageTitle"
                defaultMessage="登&nbsp;录"
              />
            </Typography>
          </Box>
          <MoreActionsMenu />
        </Toolbar>
      </AppBar>
      {/* fix position="fixed" */}
      <Toolbar />
    </>
  )
}

function MoreActionsMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const history = useHistory()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const toSignUpPage = (): void => {
    handleClose()
    history.push('/regist')
  }

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="more-actions-button"
        aria-controls="more-actions-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="more-actions-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={toSignUpPage}>
          <FormattedHTMLMessage
            id="loginPageBtnRegist"
            defaultMessage="注&nbsp;册"
          />
        </MenuItem>
      </Menu>
    </>
  )
}
