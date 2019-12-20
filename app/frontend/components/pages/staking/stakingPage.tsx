import {h, Component} from 'preact'
import {connect} from '../../../helpers/connect'
import actions from '../../../actions'

interface Props {
  resetEmailSubmission: () => void
  submitEmail: (email: string) => void
  emailSubmitSuccess: boolean
  emailSubmitMessage: string
}

interface State {
  email: string
  emailValid: boolean
  errorMessage: string
}

class StakingPage extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailValid: false,
      errorMessage: '',
    }

    this.isValidEmail = this.isValidEmail.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  isValidEmail(email) {
    // eslint-disable-next-line max-len
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gim
    return re.test(email)
  }

  updateEmail(e) {
    const isEmailValid = this.isValidEmail(e.target.value)
    this.setState({
      email: e.target.value,
      emailValid: isEmailValid,
      errorMessage: !isEmailValid && 'Invalid email format',
    })
    this.props.resetEmailSubmission()
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.emailValid) this.props.submitEmail(this.state.email)
  }

  render({emailSubmitSuccess, emailSubmitMessage}, {email, emailValid, errorMessage}) {
    return (
      <div className="staking-wrapper">
        <div className="staking-inner">
          <div className="staking-label">Upcoming</div>
          <h2 className="staking-title">
            Staking delegation and staking pool is coming to AdaLite
          </h2>
          <p className="staking-text">
            We are currently implementing staking delegation interface so our users can easily stake
            their Incentivized Testnet ADA to any stakepool directly from AdaLite. This feature will
            be available around Christmas on{' '}
            <a href="https://testnet.adalite.io/" target="_blank">
              https://testnet.adalite.io/
            </a>
            . Currently you can only check your Testnet balance there.
          </p>

          <p className="staking-text">
            We launched our own AdaLite stake pool and we hope AdaLite users will be willing to
            stake with us.
          </p>

          <div className="stakepool-info">
            <p>
              AdaLite stake pool ticker: <b>ADLT1</b>
            </p>
            {window.innerWidth > 767 && (
              <p>
                Pool id: <b>a19af49ed88574bd181022c38904d76482be0e57778f3ee28a6abf3769d6ac46</b>
              </p>
            )}
          </div>

          <form className="staking-form" id="stakingForm">
            <input
              className="input"
              type="email"
              placeholder="Enter your email to get notified"
              value={email}
              required
              onInput={this.updateEmail}
            />
            <button
              onClick={this.handleSubmit}
              className="button primary wide"
              disabled={!emailValid}
              type="submit"
              onKeyDown={(e) => {
                e.key === 'Enter' && (e.target as HTMLButtonElement).click()
              }}
            >
              Subscribe
            </button>
          </form>
          <div className="form-message-field">
            {!emailValid && <div className="form-alert error">{errorMessage}</div>}
            {emailSubmitSuccess && <div className="form-alert success">{emailSubmitMessage}</div>}
            {!emailSubmitSuccess &&
              emailSubmitMessage && <div className="form-alert error">{emailSubmitMessage}</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    emailSubmitSuccess: state.emailSubmitSuccess,
    emailSubmitMessage: state.emailSubmitMessage,
  }),
  actions
)(StakingPage)
