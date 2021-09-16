import san from 'san'
import './main.css'
import 'font-awesome/css/font-awesome.min.css'
import { router } from 'san-router'

import './todo/actions'
import './category/actions'

import { List } from './todo/List'

router.add({ rule: '/', Component: List, target: '#app'})

router.start()