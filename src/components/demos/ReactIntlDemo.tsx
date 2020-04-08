import React from 'react'
import { FormattedMessage, FormattedDate } from 'react-intl'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

function ReactIntlDemo(props: PropTypes): JSX.Element {
  return (
    <>
      <h2>React-Intl Demo</h2>
      <ButtonGroup size="small" aria-label="small contained button group">
        <Button
          onClick={(): void => {
            props.changeLocale('zh-CN')
          }}
        >
          zh-CN
        </Button>
        <Button
          onClick={(): void => {
            props.changeLocale('en-US')
          }}
        >
          en-US
        </Button>
        <Button
          onClick={(): void => {
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

interface PropTypes {
  title: string
  createTime: Date
  content: string
  changeLocale(locale: string): void
}
