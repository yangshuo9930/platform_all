import { ref, Ref, ComputedRef, unref, computed, watch, toRaw, h } from 'vue'
import type { BasicColumn, BasicTableProps } from '../types/table'
import { isEqual, cloneDeep } from 'lodash-es'
import { isArray, isString, isBoolean, isFunction } from '@monorepo/utils'
import { usePermission } from '@/hooks/web/usePermission'
import { ActionItem } from '@/components/Table'
import { renderEditCell } from '../components/editable'
import { NTooltip, NIcon } from 'naive-ui'
import { FormOutlined } from '@vicons/antd'

export function useColumns(propsRef: ComputedRef<BasicTableProps>) {
  const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<BasicColumn[]> // 受控的columns
  let cacheColumns = unref(propsRef).columns

  function handleActionColumn(propsRef: ComputedRef<BasicTableProps>, columns: BasicColumn[]) {
    const { actionColumn } = unref(propsRef)
    if (!actionColumn) return
    // columns中是已经存在了 actionColumn 则return, 否则将 actionColumn 增加进columns中
    !columns.find((col) => col.key === 'action') &&
      columns.push({
        ...(actionColumn as any)
      })
  }

  // 获取完整的columns
  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef))

    handleActionColumn(propsRef, columns)
    if (!columns) return []
    return columns
  })

  // 控制权限的, 可以先不看
  const { hasPermission } = usePermission()

  function isIfShow(action: ActionItem): boolean {
    const ifShow = action.ifShow // action.ifShow 业务控制是否显示

    let isIfShow = true

    if (isBoolean(ifShow)) {
      isIfShow = ifShow
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(action) // 如果是函数, 则执行函数逻辑, 得到是个显示的布尔值
    }
    return isIfShow
  }

  const renderTooltip = (trigger, content) => {
    return h(NTooltip, null, {
      trigger: () => trigger,
      default: () => content
    })
  }

  const getPageColumns = computed(() => {
    // 两个最终的columns
    const pageColumns = unref(getColumnsRef)
    const columns = cloneDeep(pageColumns)
    // 操作完整的columns, 得到最终要显示的columns
    return columns
      .filter((column) => {
        // 登录者是否有权限操作 || 是否要根据业务逻辑显示
        return hasPermission(column.auth as string[]) && isIfShow(column)
      })
      .map((column) => {
        // 默认 ellipsis 为true
        column.ellipsis = typeof column.ellipsis === 'undefined' ? { tooltip: true } : false

        // 如果columns的item中有edit属性, 则item可直接编辑
        const { edit } = column
        if (edit) {
          column.render = renderEditCell(column) // TODO:
          if (edit) {
            const title: any = column.title
            // 可编辑的头部新增一些提示效果, 告诉使用者该列可编辑
            column.title = () => {
              return renderTooltip(
                h('span', {}, [
                  h('span', { style: { 'margin-right': '5px' } }, title),
                  h(
                    NIcon,
                    {
                      size: 14
                    },
                    {
                      default: () => h(FormOutlined)
                    }
                  )
                ]),
                '该列可编辑'
              )
            }
          }
        }
        return column
      })
  })

  // columns改变
  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns
      cacheColumns = columns
    }
  )

  // 设置 TODO:
  function setColumns(columnList: string[]) {
    const columns: any[] = cloneDeep(columnList)
    if (!isArray(columns)) return

    if (!columns.length) {
      columnsRef.value = []
      return
    }
    const cacheKeys = cacheColumns.map((item) => item.key)
    //针对拖拽排序
    if (!isString(columns[0])) {
      columnsRef.value = columns
    } else {
      const newColumns: any[] = []
      cacheColumns.forEach((item) => {
        if (columnList.includes(item.key)) {
          newColumns.push({ ...item })
        }
      })
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return cacheKeys.indexOf(prev.key) - cacheKeys.indexOf(next.key)
        })
      }
      columnsRef.value = newColumns
    }
  }

  //获取
  function getColumns(): BasicColumn[] {
    const columns = toRaw(unref(getColumnsRef))
    return columns.map((item) => {
      return { ...item, title: item.title, key: item.key, fixed: item.fixed || undefined }
    })
  }

  //获取原始
  function getCacheColumns(isKey?: boolean): any[] {
    return isKey ? cacheColumns.map((item) => item.key) : cacheColumns
  }

  //更新原始数据单个字段
  function setCacheColumnsField(key: string | undefined, value: Partial<BasicColumn>) {
    if (!key || !value) {
      return
    }
    cacheColumns.forEach((item) => {
      if (item.key === key) {
        Object.assign(item, value)
        return
      }
    })
  }

  return {
    getColumnsRef,
    getCacheColumns,
    setCacheColumnsField,
    setColumns,
    getColumns,
    getPageColumns
  }
}
