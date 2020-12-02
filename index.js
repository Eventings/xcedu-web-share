import setPublicPath from './src/utils/set-public-path'
import boot from './src/utils/bootstrap'
import './src/utils/mixins'
import * as token from './src/utils/token'
import axios from './src/utils/axios'
import webStorage from './src/utils/webStorage'

import tools from './src/utils/tools'

const XcShare = { setPublicPath, boot, axios, token, webStorage, tools }

export default XcShare
