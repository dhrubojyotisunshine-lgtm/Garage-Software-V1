/**
 * Ant Design v5 theme configuration.
 *
 * This is the authoritative implementation of 01_ADMIN_THEME.md.
 * Seed tokens → alias overrides → component tokens.
 */

import { theme, type ThemeConfig } from 'antd'
import { brand, elevation, fontFamily, fontFamilyCode, palette } from './tokens'

const sharedTokens: ThemeConfig['token'] = {
  // ---- seed ----
  colorPrimary: palette.primary[500],
  colorSuccess: palette.success[500],
  colorWarning: palette.warning[500],
  colorError: palette.error[500],
  colorInfo: palette.primary[500],

  fontFamily,
  fontFamilyCode,

  fontSize: 14,
  fontSizeSM: 12,
  fontSizeLG: 16,
  fontSizeXL: 20,
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16,

  borderRadius: 6,
  borderRadiusSM: 4,
  borderRadiusXS: 2,
  borderRadiusLG: 8,

  // 36 not AntD's default 32 — tablet touch targets on the shop floor. §8
  controlHeight: 36,
  controlHeightSM: 28,
  controlHeightXS: 24,
  controlHeightLG: 44,

  sizeUnit: 4,
  sizeStep: 4,
  wireframe: false,

  motionUnit: 0.08,
  motionBase: 0,
}

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    ...sharedTokens,
    colorTextBase: palette.neutral[900],
    colorBgBase: palette.neutral[0],

    // ---- alias ----
    colorText: palette.neutral[900],
    colorTextSecondary: palette.neutral[600],
    colorTextTertiary: palette.neutral[500],
    colorTextQuaternary: palette.neutral[400],
    colorTextDescription: palette.neutral[500],
    colorBorder: palette.neutral[300],
    colorBorderSecondary: palette.neutral[200],
    colorSplit: palette.neutral[200],
    colorBgLayout: palette.neutral[100],
    colorBgContainer: palette.neutral[0],
    colorBgElevated: palette.neutral[0],
    colorFillAlter: palette.neutral[50],
    colorFillSecondary: palette.neutral[100],
    colorFillTertiary: palette.neutral[50],

    boxShadow: elevation.level1,
    boxShadowSecondary: elevation.level2,
    boxShadowTertiary: elevation.level1,
  },
  components: {
    Layout: {
      headerBg: palette.neutral[0],
      headerHeight: 56,
      headerPadding: '0 24px',
      siderBg: brand[500],
      bodyBg: palette.neutral[100],
      triggerBg: brand[600],
      triggerColor: palette.neutral[0],
    },
    Menu: {
      darkItemBg: brand[500],
      // Every dark menu item shares one text colour, and AntD emits
      // `color: inherit` on hover for plain (unselected) items — it only
      // honours darkItemHoverColor on selected items and submenu titles.
      // A light hover background therefore leaves plain items white-on-white.
      // Keeping every surface dark and the text white is correct in all states.
      darkSubMenuItemBg: brand[600],
      darkPopupBg: brand[600],
      darkItemColor: '#FFFFFF',
      darkItemHoverBg: brand[700],
      darkItemHoverColor: '#FFFFFF',
      darkItemSelectedBg: brand[700],
      darkItemSelectedColor: '#FFFFFF',
      darkGroupTitleColor: brand[100],
      itemHeight: 40,
      itemMarginInline: 8,
      itemBorderRadius: 6,
      iconSize: 16,
      collapsedIconSize: 18,
    },
    Table: {
      headerBg: palette.neutral[50],
      headerColor: palette.neutral[600],
      headerSortActiveBg: palette.neutral[100],
      headerSortHoverBg: palette.neutral[100],
      headerSplitColor: palette.neutral[200],
      borderColor: palette.neutral[200],
      rowHoverBg: palette.primary[50],
      rowSelectedBg: palette.primary[50],
      rowSelectedHoverBg: palette.primary[100],
      cellPaddingBlock: 9,
      cellPaddingInline: 12,
      cellFontSize: 14,
      footerBg: palette.neutral[50],
      footerColor: palette.neutral[700],
    },
    Button: {
      fontWeight: 500,
      primaryShadow: 'none',
      defaultShadow: 'none',
      dangerShadow: 'none',
      paddingInline: 16,
    },
    Input: {
      paddingBlock: 6,
      paddingInline: 12,
      hoverBorderColor: palette.primary[400],
      activeBorderColor: palette.primary[500],
      activeShadow: '0 0 0 2px rgba(15,98,254,.12)',
    },
    InputNumber: {
      hoverBorderColor: palette.primary[400],
      activeBorderColor: palette.primary[500],
    },
    Select: {
      optionSelectedBg: palette.primary[50],
      optionSelectedColor: palette.primary[700],
      optionHeight: 36,
    },
    Card: {
      headerHeight: 48,
      headerFontSize: 16,
      paddingLG: 16,
      boxShadowTertiary: elevation.level1,
    },
    Tabs: {
      horizontalItemPadding: '10px 0',
      horizontalMargin: '0 0 16px 0',
      itemColor: palette.neutral[600],
      itemHoverColor: palette.primary[600],
      itemSelectedColor: palette.primary[700],
      inkBarColor: palette.primary[500],
      titleFontSize: 14,
    },
    Form: {
      labelColor: palette.neutral[700],
      labelFontSize: 13,
      itemMarginBottom: 16,
      verticalLabelPadding: '0 0 4px',
    },
    Modal: {
      titleFontSize: 16,
      headerBg: palette.neutral[0],
      contentBg: palette.neutral[0],
      borderRadiusLG: 8,
    },
    Drawer: {
      footerPaddingBlock: 12,
      footerPaddingInline: 16,
    },
    Tag: {
      defaultBg: palette.neutral[100],
      defaultColor: palette.neutral[700],
      borderRadiusSM: 4,
    },
    Descriptions: {
      labelBg: palette.neutral[50],
      titleMarginBottom: 12,
      itemPaddingBottom: 12,
    },
    Steps: {
      titleLineHeight: 22,
      iconSize: 28,
      iconFontSize: 14,
    },
    Statistic: {
      contentFontSize: 30,
      titleFontSize: 13,
    },
    Tooltip: {
      colorBgSpotlight: palette.neutral[800],
    },
    Segmented: {
      itemSelectedBg: palette.neutral[0],
      trackBg: palette.neutral[100],
    },
    Breadcrumb: {
      itemColor: palette.neutral[500],
      lastItemColor: palette.neutral[900],
      linkColor: palette.neutral[500],
      linkHoverColor: palette.primary[600],
      separatorColor: palette.neutral[400],
    },
  },
}

/**
 * Dark mode is in scope but deferred. Because every colour is a token and every
 * status colour resolves through statusColors.ts, shipping it costs this file
 * only — no module component changes. §17
 */
export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    ...sharedTokens,
    colorTextBase: '#E2E8F0',
    colorBgBase: '#0B1220',
    colorBgLayout: '#0B1220',
    colorBgContainer: '#111A2C',
    colorBgElevated: '#16203A',
    colorBorder: '#243049',
    colorBorderSecondary: '#1B2438',
  },
  components: {
    Layout: {
      headerBg: '#111A2C',
      headerHeight: 56,
      siderBg: '#070C16',
      bodyBg: '#0B1220',
    },
    Table: {
      headerBg: '#16203A',
      borderColor: '#243049',
      rowHoverBg: '#16203A',
    },
  },
}

/**
 * COMPACT is applied by wrapping a subtree in a nested ConfigProvider.
 * NEVER apply it globally — that would undo the 36px touch-target decision. §8
 */
export const compactAlgorithm = theme.compactAlgorithm
