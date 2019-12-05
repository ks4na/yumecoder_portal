import React from 'react'
import { FormattedMessage, FormattedDate } from 'react-intl'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import PropTypes from 'prop-types'

function ReactIntlDemo(props) {
  return (
    <>
      <h2>React-Intl Demo</h2>
      <ButtonGroup size="small" aria-label="small contained button group">
        <Button
          onClick={() => {
            props.changeLocale('zh-CN')
          }}
        >
          zh-CN
        </Button>
        <Button
          onClick={() => {
            props.changeLocale('en-US')
          }}
        >
          en-US
        </Button>
        <Button
          onClick={() => {
            props.changeLocale('ja-JP')
          }}
        >
          ja-JP
        </Button>
      </ButtonGroup>
      <h3>
        <FormattedMessage
          id="title"
          description="ReactIntlDemo's title"
          defaultMessage="default title"
        />
        : {props.title}
      </h3>
      <p>
        <FormattedMessage
          id="createTime"
          description="ReactIntlDemo's createTime"
          defaultMessage="default createTime"
        />
        : <FormattedDate value={props.createTime} />
      </p>
      <div>
        <FormattedMessage
          id="content"
          description="ReactIntlDemo's content"
          defaultMessage="default content"
        />
        : {props.content}
      </div>
    </>
  )
}

export default ReactIntlDemo

ReactIntlDemo.propTypes = {
  title: PropTypes.string,
  createTime: PropTypes.instanceOf(Date),
  content: PropTypes.string,
  changeLocale: PropTypes.func.isRequired
}
