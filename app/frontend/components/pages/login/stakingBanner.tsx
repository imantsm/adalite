import {h} from 'preact'

interface Props {
  onRequestClose: () => void
}

const StakingBanner = ({onRequestClose}: Props) => (
  <div className="banner error">
    <div className="banner-text">
      We are sorry but our support for ITN is temporarily disrupted. As we are focusing on the
      Shelley main-net fork we don't know when (and if) we will be able to restore this
      functionality.
    </div>
    <button
      className="button close banner-close"
      {
      ...{ariaLabel: 'Close banner'} /* silence ts*/
      }
      onClick={(e) => {
        onRequestClose()
      }}
    />
  </div>
)

export default StakingBanner
