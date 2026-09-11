import * as React from 'react'
import { banner, asciiArt, subtitleRow, dividerLine, subtitleText } from './ascii-banner.module.css'

const ASCII_ART = ` █████╗ ██╗  ██╗██╗███╗   ███╗███████╗
██╔══██╗╚██╗██╔╝██║████╗ ████║██╔════╝
███████║ ╚███╔╝ ██║██╔████╔██║███████╗
██╔══██║ ██╔██╗ ██║██║╚██╔╝██║╚════██║
██║  ██║██╔╝ ██╗██║██║ ╚═╝ ██║███████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚══════╝`

const AsciiBanner = () => (
  <div className={banner}>
    <pre className={asciiArt}>{ASCII_ART}</pre>
    <div className={subtitleRow}>
      <span className={dividerLine} />
      <span className={subtitleText}>axims.id.au</span>
      <span className={dividerLine} />
    </div>
  </div>
)

export default AsciiBanner