import { Dialog } from "@mui/material"

export function getDefaultDialogSettings() {
  return ({
    isOpen: false,
    dialogCloseFunc: null,
    dialogCurrInterfaceFunc: null
  })
}

export function changeDialogSettings(isOpen, dialogCloseFunc, dialogCurrInterfaceFunc, setDialogSettings) {
  setDialogSettings({
    isOpen: isOpen,
    dialogCloseFunc: dialogCloseFunc,
    dialogCurrInterfaceFunc: dialogCurrInterfaceFunc
  })
}

export function getDialogJSX(dialogSettings) {
  return (
    <Dialog
      open={dialogSettings.isOpen}
      onClose={dialogSettings.dialogCloseFunc}>
      {dialogSettings.dialogCurrInterfaceFunc ? dialogSettings.dialogCurrInterfaceFunc() : null}
    </Dialog>
  )
}

export function getResetDialogFunction(setDialogSettings) {
  return (() => {
    setDialogSettings(getDefaultDialogSettings())
  })
}