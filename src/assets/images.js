import {Button, collides, Grid, pointerPressed, Sprite, Text, Timer} from 'kontra'

export const images = {
	doorBlink: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAABRCAYAAACkJjRZAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAn9JREFUaN7VmN2OgjAQRj+7ulr3Yt//QaXg8rM3kDTNFEpnpq2TmCgRcjxOy8dclmUBo34B3IJjDsDL+/wDwIJXf4Zx8pWABIDee28APMCvjgP6JI4NACbvswVwYUK+OUavAL6J407D5naxnLKRXz4K2xy2a+aAfgG4x375WhdJm7mgKTafQjanXFATsek0beaAUn33t74ke7MPdo9ToDFTYW9yN/cltHkWlDI1Ktmcc0FL2nSxxZFSd+K747raJW06yuYZUFvTZirofd3k/ZqUbC4c0BI25z2bKaDfawAJbQ4lbaaApth8CNjsU26JsboRwZiyaZig3ZHNI1Bb4J4+pdjcA6WCcfgXPYRsggNaYqWHbXQalArGc3DRojZjoPZg+5CwOZ6xSYFSwXip2ZsxUGrz1rD55oBS200YFCRsvnJOMoVtho8tp0FjNqv3ZghKBWP/kUDC5jvXpg9qD3rzXtOmvx19HTxgPaVGMxxQW2Cld8zzYYhgPAQ2rYDNSQJ0L8o9iLYobhORlT4J2uwlbFKgkjYXKZsh6KBgc9YA7YRtOgiWUbLpJG36oO5gMlLV5gZKjbVVhwm5oJ2gzVnD5gbavM1w1UvY7KFURtBmp2UzDM4cm5Omzb3gXCV4pATna6nRjGRwbs5mLDirjmYkg3NzNrmgWaOZGqAvFKxc0OzRTGnQDoUrB/Rd2mYuaHGbOaDs0Uwp0Co2z4KKjGZKgFazeQa0r2kzFXSpbTMVVHQ0owWqMkzQAHUt2DwCbcbmEajaMEESdG7J5h5oUzZjoKqjGUnQrjWbFOjUok0KtEOjZQKbwyeANmvTBx1btumDNm1zAy06muGAvvAB9Q9jodHvy+jl0QAAAABJRU5ErkJggg==',
	doorBlink2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAABICAYAAAB1Aey6AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAo1JREFUaN7NmV17gyAMRqOtnc7//0+Hc/2Yu4E9aSRIIAhctd7sLG3e42u7bdug0TP00O6ZW4X7AIBrq3CfAAAtwk0AcGkRrrNw0CLchJi2luB6PDUA+O4bW4LOvv5tCe4CACN6v7T0sc7o9QsA1lYW4goAN/TeuOt9Y1N7AMC9FX3dAGAg3zWnr+rix1P7sZNrQl+j0xSZ2lhbX52bjgtcu6Vv12vBvWnKwtHrVeB2mrJGoNerwE1UUx59VYHzaspzvQocns6/pkikVIG72nClmhqIvqrAsZoKbc4pHTSgqWttuKCmasLR6Sy0ZdWEw9NZfZqqBYens6Gp7QL3bLiO0ZQ3cM+GwxIPaupsOCpxpykaxKFTrH2JNMWcIr2VfqcM0xdCp1ipFmvKc0yJj5V20IXpC6HztBZRXwifpqIC1/M1UIXjOugk+DvYu6pws0dTu14Qig70D6nCjTmaIvVQFc7XQUWaIgZRheM0JYkOZxBVuJCmboLoWEu4dVLQlCkhfg1NvUWHJhzexFRNLSVumeitT4qmdtGhBZerqd+jqaXCDQqa8kaHBlyuptjoyIXDHTRVU0YSoqkdNEVT91B05MDhDpqqKSOZRCxcx2hqEGjqMDpS4fAmpmhqi4mOFDi6iYZ5QHNYWErA4U18Ik3FBu4rNjqkcJzcDx9fpS6BBG72xIBEU3c0aVU47nfQIoErheM0NZaKjlg4fMOIY2COnFpSdMTCzR5NSR5fLSnREQM3Zmrq5at5GnB0E90EJL3AgNLpIzUVGx2PnOgIwXGaGgWa+tJ8ZNUzHdRpShK4a250cHAhTfVnRQcHh1PfaUrSCxa72epw3O+gsZpKvuuIgfNpqhNoKuleLeb8AYGiu58lJMT3AAAAAElFTkSuQmCC',
	doorJam: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAFCAYAAAAqspAeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAACBJREFUOMtjZBA08mEYBXQBTKNBMBrYo4E9CkYDe8gAACSJAJmHmlbyAAAAAElFTkSuQmCC',
	floorShadow: 'data:image/png;base64,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',
	indicator: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAGCAYAAAAhS6XkAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAD5JREFUGNNjZOQ3fM7AyCDBQCn4z/CCiSoGMTAwMDAySDAxUBFQ2TAmKpnHxMTAqDl78Y//v/+yUxxkLMw/AfcXCcvXheahAAAAAElFTkSuQmCC',
	yellowGem: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJZlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgExAAIAAAARAAAAWodpAAQAAAABAAAAbAAAAAAAAABgAAAAAQAAAGAAAAABd3d3Lmlua3NjYXBlLm9yZwAAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAACCgAwAEAAAAAQAAACAAAAAAs9pmNgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAi1pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+d3d3Lmlua3NjYXBlLm9yZzwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj45NjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+OTY8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgryNKKqAAAJu0lEQVRYCZ1XWY8U1xX+zr23qnq2no1ZAA9gkDFhmBjHOFixZQ0ifyAP9s+Ik0f+QHiF/AzzwHtiNMiSHcsChTAMYfGAgWGYlVmY6e7a7s13qmmMjSJFua1SdVfdPst3vrNcwX9ZYQYO058FkUulbgkrk+Pl83DW5+EMynAiFGGfAOPVO2BJnCwGI3OIZSYekq9kdG6pevclLEamRc5cLfT3LxdlvLnC3GQsk3OZvknnp6akWfwRTf95VDN1pLSn6YHMo0gDdwhcQjGxAbr1Lshb2EbNXAo99q/J4Vs3Vc7rMvV3Z71hQGdj+BJxfuzweaTuT5ETg7USRSPLQpyEILDiCwlibCXIew8RL3rnyygxMUYc8iJ4dLsL0XE5JzKXdWR3lOv9ZwaEax9Ecup6Hr7BkWzgvcvxO5NT5d11+Pv/akocRb5vyMEayO42XaL3euky9J66hJ+gIgMKlD63TrrM/hi5x2w06P4gB27Nh0Adcj1v//E1AzrWZd/jZKifvhoffLc/TZOUOFt7+3tXRv3wcQK7ughRxWWgHoPQ3QMpcwhxf90dERrTNqSM9kRJHssWBt10/PbcjY4uNaJCICh1JpGFa/S89/T1eOJX/WnmUsl342ATYkuuLdyEfTwHFDHQKBBMBD88BLRymO0tSERpEcVFxMCSI52loBQhi/ptkvfYLRrzQYXES545ZXulXGPe/f7l+OCx/rTlUuS7STDd8MlxmNYWzNoq/Do93m4g9NXhD41Bnr+AebLMsPO5UeUMTzfD0WMhCY0wvDQmTpJ8y6dRZPrzjeJyCJOnKk7MTDujqabG5kcnzkdvH51KW3EqxW4M2wffNQmzsQo7exn+eY6wugU/Noby/SOQ7SbM42eAJQ9tFXemDDm4WcAvZ/A7FqFsc5RGgEkd52t5Shun8tvhfAXQ6lVSlovQT2VDZ2+YwQOmLNICpt/5ZAJ2fQFy9+8UWAO2SMaT76PY3wd78wHM/UdAV1clpyJjJYk/i5K84HMnMERB+hhn1wmJFFaCK4edD+PJyWRidpZ40fvo6Bfx+KgpxTbhqDwagtmahzz4Bn6Jwsj6YnoaxfHDcLMLMHfuMOd72so93SPhoPec3BgZBPpqzJQUYYOo7XKbb1vHba4sQjNyMLJZfKECRCtc/qi8G+2YejZ8oPCjB51EJNbjHxH+vYbQaKL4+Lck3ACib29Alp8w3kSkpaynYE3BjDWLd39oLxEggE/X+E4V80osDGuCdFUFlQ9CEVm4fDDejg66d125Fc5GNdTzZzuZtOZis3ibJBpHWGcs6VH50W8YY4P4b18TiS16Xmfa0dOMirUONV5wfx/KYxPkRYOGL7d5oRYoN1oMyQ730hAxTH8Rl6fMigR1Le3Ot8IZy7IaKMyoQEIZnj6Fb9QoVMn2Avb2fSqj8T31ysPK895u4NlDhP1HUE4egFlYb/MiITq6qrBoJjAPWRiZm/zuYViwApMGeWBkwhmnjQUNksWICXxZGdA1iJKQy8oGzPw8QkImJQlEoXaOggw5so5y6hSKd0Zh555Q+TzQSwNZjSvlRA+1GH6IiGka6OMoYsGsWoxFgyEx5oTTrsYSxLe6j967BN51wzzbgKxvUEg/3eH7ZhNBU84xsZvrKD76lDEfg/v6GuTBD0D/MKujaiFUKQk4UEfYx0Kl7aGZ0SaKt6qH/w+FgCEMZdjHZJHxIlMbxep/g4tgVrfJAcY2JnSKipZeS88Ze+w8R/HJafjRbkRXqHxjCaFS/pJkzRcIb+2Hn9hTpSRaVM5yo4VbPPfkTT7PjXZSqfeNu0pB3qDhWrm9CNkdWnxMhVXN13hWyttMLz/9hFyIEH31j4r9ISEXdMXcn7Xg3zuJcv8Qv5Nwqlw0/imzgPc6nQh8XpKY9Aluk4DaaCkam5jIPYtDErN8sZwawp+/ICaEREssUwvJQJuUhYf97hb94buINSKnVxkV1CKUH34Iv5fKm6lKpwNKPColAY3ODGPDCF0JfQ4+qVmbLdxdctLTu4gDkxMlQ6wh0DgallR5TqiUybQWvb0o3xqHrG1C7t0hOmS6eqDGUTnI/PzjXzPmw5CWxlpTjqlK6FEa2M1tyIAlD8kTJWdQslFH0Vo0KHZvwRaataXkrFxa0XpYybrY3uhd6GI69vdCHj2D3GY3tPRadys6KcNVr6P4/QcoD43SpowAtkMVNFvogF1YZrckmfv7EFgClW3MpBLaMX3jljHZ0gxaOyqTEw4FM5ZhkOlUU4tpqLL2CZUvs8DUtLC39VdZMbIHxe+Ow/d3EXYqVuNLGiWMPT21935kKi9DhqmcTqhB6nz1Jd2FyVZmnN1cu5Ivr21H40N1jlCFWV51WFli3Hc0L6oOyFGrgrmNO//PehD2sSsenyAPCDfrvt7VOW1vhulr5x7RqCaZTpKODFQNqpJjTBGZEGfUGW+uXDFyBks+37pkth/D3JzNzd1vmVoLVMgY6VV5rOTgUutJyLB3BP7wWJXj6nmH8coXu7gB9x1DtbxKDhBy1oIwxot8qeAXm5saHWitXVLdlWRJ0ov5o9vetta7QjRQKLuFZVMUtUFyQXdpkVHuUJgfZXFKOYbxgqabfidf7MMVZshs9Rs9HNXsDkIPqyHLtnqv5pM6XdnCok/SuYvqk+H0a5Mjd2YxOHzBHKTGnA29cpUWs49X/XyYRrCZaBxDN0sy8xsZ2cxLqju75/1nMP9km9aaT6UywHQeJJmX7rGqrmiIAmxUumSXIXt4QU5hNoTPaA8PDWpJ5ItzWRlmoxFOngXpXD2lvMoIEnEfvRhI6APtI8Eq7xWBRkqyLcI8eMw5gHuGYpgh9oo+Gs/5kFBCfrhOEj/Pku4yyR7em43uPDynOnH1UhXhV4eG1uMTR+x6fs3tlAM6w+kYRdxoCqFnNQxCA/QRC0zQAsMlGxxImw1OR1F7MFWDteZ3ljHMzjyLBpMkH+zb9P76qdoU5juT8Us/qeLllJrdmzwpu8WMS8OAznA8WFmayRbEPaqUvYLVU39AGizhJcOhTUojzJTtrJ+N5UQ1j7CFZGc6nnz65lje+VPn0KBICKfX2IQp/zRjDwpNmkEXhQcTKtOSWRB+bVRV+WxLUG9eAvbGwcTzYFLTg8nLw09H5ysEOg86SMwRkaMm/CXsFH/WGQ6rOXSS0WJF7xhk9VcZV6lkyeTHa+0K///R7JdG6O+fDqdl+3CqswMHmJ8Op4zKq8MpkakOp6F9OB1wF3XyVTkdx/T76+sNBDovAw8N0Ln9c5D2HAMeTo5HaTgrejwveDznMME/88ikGPB4bmWRo/gtE8mMHZIr/+vx/D8/fwmyovfPAAAAAABJRU5ErkJggg==',
	diamond: 'data:image/png;base64,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',
	arrowUp: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAACXBIWXMAAAbJAAAGyQGh53xXAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAJ1JREFUGNONkD0KwmAQRN9ugiTgFWwliKUSolVO4hmsbGy8STyDF7DLj2iZe4hgZb610RDBoNsNvJlhVsyMX6ddIaBxUa2mdT3oheZluQbLhtfb9sP8rpvleeSJXoAQeDhzy1OSVG1Sejz6nmj2AgB8T3S/yPOwhe5BsAHiboVB1KjuACQuiokZZyD4MsyZ09Q3J2PUDv37m5H886cnsN8yl97LyDoAAAAASUVORK5CYII=',
	arrowDown: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAACXBIWXMAAAbJAAAGyQGh53xXAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAJpJREFUGNONkLEOAVEQRc9MNiH8y5b73jb+Qq8XpcYH8AEapU4j8QNaYlel16uUgsi+UZCNTVaY+uTce0fMjF8XuW2eoqHzDVDIItPQFmQCSB1kQldz79cgs1qNsNg5t1SAW6s5BI5VBSdEBu9IOMTxJWA9oPjQ9LMkOZcQwN77jQnTVwrzLE1W5brK1BBGherjfm2MK9X++dMTkT8s5B1wNg4AAAAASUVORK5CYII=',
	diamondBlue: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAApFJREFUSMfd1ktPE1EUB/D/mbkzQzu0FKEorYVaFyRGTQiLroTEmLAhfgYXfgU3EFeGhX4HHx+AuJCIOxJRFyQ+ovuS2gaBttLS9zzuHBcEaBUW2qELz/LeO/nNufec5BAzI/rkS8xjZZlBC9VUPCOFmoYPoVfqm2Zh/yqBVxXpLhUXZ3Zo9PHnmGR1E8BlAGhFIxvt4fCsH2Aov/dWtKw5AAAhr7pOWvFYWT7CAECvNib8wFQC1LY1ebzASLiq9khh0ELXQctJgjnfK3hnmErESHauEXBXqSZjmVY0siENLXu0ISzney/YjbCK+wnhXInoh8kRsm5A32iMXdgivCzzSdq8LSxnK0BcNocDib+FhjRS58e00NyICOm23Wg4rK0UpLFW4pGmPGRE1xdEcXdAj5tB8elmVEz/S3Y5CexJxriuY33fHl0rMY4wAFDgczQl8KYkkWl67ec5uws7FxAALA9Y2XbKjvfn3rmAAJBtsX3a+rmBZ8WZoEJ9Bq8PKv0DJwOkz0ZUTJn+o119aCjA7aiGe0njokrA/IiKcZ3wseqh/lt5+5Kh5QHrRQdfD2QTAH5Y7Ct26pVaHvAi7/zMtxmvS66v2Jlv6DHwriLRkn2s0qLN/W2Lvjf+fwN29mGVXDcjLPeg0UbtG4I9/Uyj3NoWTE3X0FIgih+DgVL5g1a3YqptJwFMA0Bt4tL7WtOb7ikTpnoot3sLAKShZe2wmXPMoCEG9mtTAEY7D7uGNtnr1bmGluoczALFSjJYrBQUAq92HpSGlgVRoufHIopL/WQwAwCP8EpRpLsEwvFYaIfNnF8FYg8Ndk5/OY3EQ6W4OLOjuk6aQc8AFJ2QafgFOmZggIACA0+FItKFB9d2fwH86Ay+KR5cZAAAAABJRU5ErkJggg==',
	diamondYellow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAbCAYAAACEP1QvAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA5FJREFUSMe9ll1om2UUx3/nffMmTdquaZq0ndV2H22a1m1u0066+jFkY4I6pkMUFfxA9EZERBhlEy0ULFi0IHjtlVQqXowhXiioaJ2wXSh1ypxNh2XFLGs31jYfTZ7jhTQm6dalWdsH3pv/eZ/ze895znueg6pS3oPMnmrqVUXK9WFR5oqNhJ+zbTlItP7Zcn2UBZ862eRDpR8AlQH+aaxcN7hrvrpX0GYAhCbm5ei6wKeHW+8A3ixU9S0mNm5ac3jWsgdBfUWyF9WBNYXHhjv2Ak/ewPwU0dseWBt4n1himSFAbvySDoFYqw6/1NH+AtB1fS81i/BdjDc+v6rw+IlINWh/oSrqNDyTRjyKd1++/B7n6zasGlyTegzYWFBhm3eN2pXNB6g9fh5vDzhti6YGXE5vKX5FVZcvsi/at0iG34CK3CbLSQT3H7uGu6UeV+08qV/ckHKR+AkS34GZSaNmG1tif95S5JJhMB8MUL39wM+Y6XoWomASPtztMdK/Q+JrMDMAbix74JbSHh/u2Ac8XrChonrKE2r9r/CyVyB5FjQbYvbLi5jZvLPSJxhv3F8evE8stcxgsezffTgK/N/LzVVI/eXgOzKxNG0Mgtgrhsc7wy8Dd+drTqB5zPbVdi9te3Gwg904rb8WWe4i2vDSiuDxE5FqVfoKoxDj3/mILNNkBN8RN4gp0vsZD9SUDDdJfQdozNcqW/aMYjl3Ll9C7gie+0aLxHrEc7wkeOyztq0CrxWEZDlz3q1dbSW1Le+D7VBxrahTvM54KHxTuIj9IeDJ12q6XhwTsRpKgquEqDp0pjgliP3+svDLI5GHQB8rGBx8/r+d0J7dWL4VXFft3VjBC0XqISYaDl4fPiK2UR0qriH/3qOz2AEHTweIpzS44MH39NTSYpIP+FZcucByZ23Cr4qwPbff2aCeyOFzxt3iZyE5BQ5Y4YXs3KlYNhGdA3PTbzDz3u8rqxL35/4QoZPmxleAj3O9/eqnO2rTrtQ5IAhgHPMHgWQakR1ufw8VoUfJJieZv/gJmp1d0bQiFmf9dRnjrtBti5MYbleYpsnLLoC0K/0uEBTRaRNIjeGYHsAGJX3lB2zvJlLxr1YMBlBD58wll9pu/TEQzLZZttaTyrwNvCHxz8MRNXLGVKVOa1VmJ8qSu9iuuJ1scpJVWHMer56uqcvcI0buldjJzR+ZyoWHsWhlvZZwwVdlvvkXrSl2CUZU2WEAAAAASUVORK5CYII=',
	orangeDiamond: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABI9JREFUSMeVlV1oXEUYhp9vzs8mm2STtGnW1JA2VGsoVqzxh4KRKnqhiIjohTeWoLYIKiKCEvyhVaw31QtFLBXBKgihF9YbUURU6I20SqViGzVNmvQ3TdIk627OnjPzebG7ySb9Swbec2YO873vzDvffEdUlUqb3Rn2qtHPCEFChRBc6Kve7I0EYaGDWdBpAwWFImgsUOAkjnYSDDGoFSSGOK57tuGNi59WuE2lU3hV2hXdjQIJaCKQwMWazr+CsNABgA/48wsDwJMOLXJYI0EjgQjUgRDtHui7pWuh0A4xiXqfu5hmACwQg0sCokxrgyRVxEZByn0FVDGoTwQUAQeagBbjTDrO7ftpx73+nNDEOfOijbnPxYqrkCZQaH9obFX9kXZbkBIpgAi4EmFJCNSTW0lkEMDFYCNFI0hHw3esmCjsBDBneqXLxrzrYsXF4IqKsyXOfFNbLvRnxAgQlwUAXHlLbg4igZ6xs4qNFBeBnS3xNc38+/LB5x97wNds865pr/WMacr66ZY2zw99qMmYGdto/KnvnM3LCaS0clFilxgrM5oiESEu7ZwiJDZocc4eVetCKe0SUUetm6DOXOjzW56YOopcfBQdKFlRtqTBovlvaiURWpHKsZQVK0+dR56G85kVk6swCFKeKgYnHiQrD5lwxu0ADiPlE/PKMIg2p08ZXzCBYMKF8BZ9S8L6IZwKtpxMZQwX7xkK88F2wxZNRPTpcs5QLWg7amskACmLSzV8MD6YoAQJqF8sMp6sT6Z0Td+Gt/pzBiDYpEcQfXvh/YB05/iNecnmROYz+nKtKJnJBhlbP2e9hdjWMZxsPrD5tb1fLbiw4RTvIfxaTeCHBf+/dHZ0gaXz1pYgYMU77lPwq2OP8fBoTdZ76pLKwBZNcLoVKFQHxCtTHkGlKpQRlKDlfo1cNFQVjFN0xxGZF7q37clfKgSE3XpMVd+s/tbUebJj0nREC0TKbwkBjzyRbnQJqIWCa+S8bOzvef3jr6t5zGK/U928r/BLZZxpOJ0a9zecE1+RQBF/IaypGbSJ1qotVZXj8shwauT33sW85tKjVYfTXiA3d9h1aVexaw7lHeajOtSCS+Ck9EQkua3dew7FSxCC1O06qKJ9lfGqNQPZSTojAiAEDUADn8irT3TcrtUEcpplgvZ9m3f2/3w5TnOllE1t4iPge4Dsyj9qz7LhDP78fbL4nP1zdT6Ynai3iTAY3P/33e98sf1KfObKt0PViW4DpkUUv87OztnmCX5qlprr7ZA6GPF7ohY38iTVf9GlC0HNJh0W9BWAxtYTqyNpTERAPIca44LRsfactDErmQ+6dv14+GpcVxUCCG7TvcC317Ucy1worhtFFDxwKv94uekVE+aG3+7afaDvWjzXFAJIRJ8BnQxSca5SGeyYnZgIu3Jphh6/mmXLEkpv0tPi9KXa5vGs83zFRycHGjrVad9NHw6dWAqHLGEx88XzoNk/c7btzjpvLD61v3lg3ZfnHlxqrGEZLXT6nJcqDkUX9KRXPN+7nFh/OZPp0bHgh/pPkskkXtuvZ5cT+j99fxrBhFB+nwAAAABJRU5ErkJggg==',
	emerald: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAZCAYAAADNAiUZAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABUhJREFUSMeVVluIVVUY/tZtn7332XNuc3S6SISO1IMPYhBBL0GgYz1LENW7BY5kQUXgo6moow8K0UO9GAQRBKEWgUEPlUREPQTjTIKgjc44c5xz9n2t1cO/zjnjzBmjDZu191rr/7/1375/MWstRj2Hv98+kSfZdbBetH5trQhjG2UtwtiX3uSZfTduj9ItscljC3FSp9ui1rZrUIpQigIoC0AbAmYMEByQClCK5JIEuH2rG6royeMA3hilm42ydPrbyWd69/1rik0wWf0TteYdlBrIMwdcDkGlJECvAlQqwNwsUGqgohq2XW8+d3rf/C/r9fMNpwBjtmTnhR1nAFD2dqHTYYhjIE3JkjgevklC81kG3F0AkhTIc6Abd1ie6wtsRAA2gE5f2vF63Bt7lvOh5wPxNJaXgDRbA9xbA5gDRU4eyDMCLXKLO8uLew5dmXztoaBvXd0V5SU/pVhjMOf7QNV/FIx76KyQ0tRZmyb0XxaAMYC2gBDDMMRpjCTunT10aWdtU1CVZR/mabO91iNRBBgNPD6+B90uUBqnMKZRGwCWLNUFEIRAUQ6TbWllsckZ3h8J+vY3T21PYnlE8WGFVCNKFmMAjhATW+uQnJLHD2jknJLIOBDBgXqd5hkDwAp0uvfenf5ux84NoKXQ52zZHgSScyAMAGNJoTHAY43d8EOGKALCkFwfhLQXDOACEApoNCiTpaS5rFgRJtczD4BOX97xYtINXxbcG1g5NgZYANY4YAtoIzBWeQL1JoEGIR2M9QEFoCSgPKDVIlApACkNVrN7L01fmZwCAMFe+EGuxquXrX6kxVwsPc/F0jpQMwTntgUV3ASYGQCAAZyRxcJZG/hDxiLyyAFTff7r1Yvnxe5X+KE4rr8qeQDGNMBS+NUe4uQ+enEPad6DtilgC4AJWCOgiwiVaAG6HFrIOcVTiCFhhBFlsnRBK/KsWS3VkixKfSgpZmE9Dc4MrAVyCyQl1SUHIKxzkwCYYkgTjmyRQ3IDXQBCkmLhEktIcrNUQIcDSa8ftAw6Lw9L4YkTyisv5EUCgFxZawA1HwhLQLv0hwE0AFNSrMOASoNJygxjaE1wWgeAvCAC4byfQCGkUh/x1k/zH1fDLX8ADFpT7f2zQAVfFg5UU31aQzGylvb1Y2YNrWtN+/uyCwuuljUR7FjQ/uvW6twn/OhRa5SQbwpWs6WzLO4CnQ7RWqlJqJ9I/YNlGVBkRBz9hNOa9pclyfdW3SFKQPIalPQOfnHAag4AM1NzP46Fza+sESRYAkt3h6e0rvBhCajPwf2xb30fuCiApUXSQ/ICtbD15Zmp2asPkIMnxeEobObGCaYZsLw8ZBrGKFZpToSeuW6SF4DVQ2BjgOV7dBit6T8KmgVn9p0NjHRq7/WbjWr9uJQeCVsSLktKBM7dqS29eT78Xr9nZcW53AJSeKjXGsfOTP19YyThs252rN1sL3DOIBjVXLdL6e95AINjHEWMpBT9M07rSgKr913ZMIBzhnarvahYeGLTLnP6wM2kWvGPVKvh4AqSpY7wBeApUu4HQFCl0fNonrtSyTKSkwqIqiHCwJ8+uff33kOb+Mz++Ytbxts/e4qTJcq1M9ekjaaEYi6xjEu8ogDyEgMZpRi2NMd/Pbtv/vP/vDlYWCu5Olir1a1SQBAQeSvP3YN86i5+QGPFp3nlAeMtagJKAfWxhlVKHrTYeAnjo25r5/bP/tZsjn9aqUi0JzBoAg8ABuuAXYOamAC8ikQjan42MzV37X9dQT1r32vUth4o0yRaTTe4Y/DoEffeZi2IhdQfbKb7X3o/qg1kEcgUAAAAAElFTkSuQmCC',
	redDiamond: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABLdJREFUSMetlu1vU3UUx7+/373t7bq2a9kDOEA6HofDDIkCb9SoUWMcGxrQhKgY/Qc0mhjfOCYv8R/wlfGVCQ+LgwFRkEDcUxjdGJSto2PtOsbK1oeNru16n44vNrtderdO4klucu+55/w+5/dwzu8wIoKpNF6oUZncS7pSzsBQTATBmmSi5QDONgTN/jNT0EdnHCRbusMTHXuGQ3dARTiMCNvc27C97t0Ak9SDOH109mkbXugFBtX6y6Owb09idBiSicnTIkHAk+QEHo311UKx/IqWFl4c1NR2YmY6dCQ6PgAAsJFQHLRoEx0fQHI61ITb9T+svnQfXmjKzsVaA/0XuK4reXWYp5FjuinESgw1umMpci5g195DZHdWfozWxjOFoCPttWoufTPQf96Zyz7JO84wBX4+C1ppf8BQpzvhIesS3ObA7r1NaVGSDqL1A//S0jVc9JCqtI8OXjNA5pmGAEuBVsQAOggBnkIWWl4nz8/hwdBfpaRTOxrbKwBAOMEYx/T6cw9He/Ynp0fzxhoId/ns4pKtfMAZAB3ADFewnmzgi5Zybg6aprrLyjfuw8/R34QT7q9PxaeCn02Eeg0DDPMUZplqGHA1UUDIMB2VJOV16dQUrJJjq73SYeeqOv/N4P3rBqcIyyDGZIOOADBmnMrT8DjLIcIyBl1opAOaIn8r6roGH4vBxgVUkw0lEBHhWdOoDblNMN25CM/CpYuwQUSGVKggaKRCXL7xoywNAWzVzV+WGDArGQTCFMvBDTJMuSBhtbVAANAqdclsBBHPIOwZfPizgCiPozX7rHlGJaWlKK/ZglLvBqiahph/BLPjE/8PyGa3o3LjJnhqNqFszw6Uvbgdw+cug4sWvPrjV0gEwwhd+RvRvrsgjf47yOXxoLpmK1w1G+Hctwsl1VWLB0DHRFcfdBB2Hn4H63Z4sW6HF+mpGMJXuxC53g1NUYuD7E4nvLW1cGzdDPf+OljXuQzGscEgMomZheQcCqKibicAoLSqAnXHGrG94U2MXetG+uotYE4pBDHOse2FOnhfrof0ym4wu9U0qoedvvz7eKcvD8rfSy4Hdh5+G/Te68h23UPicjeyU7EFEOcC3vryOGwHagFh5UOoZOYR9d3Lf0d9fiiZeVjstsLjL1lhf+Ml2F+rh9w9CMEvgosW6afyuLQqBAAmewegyUv1T5NlTPbeKdKxcLhnSiAI1lMc9be/e+6x+5LQFVrV52HnrTXpDJzOEKqjZVdglb/naG7WoYifeAedIxiaNHVIP44h8WCsQJ8IhpCenDZP6vtRbAk4xqCJx3D6qLawXu3vJ5kgHtrcw1I0XdApYaLTB+jmeTLe01cIiafwfCdlONCA8w0xYwk62xCQdOnTDX/O6sgphrsh23UXHlhMn1zHAGhZEKSoqPojQZIuff5vv1BY61oPtTmz9pOuS5H85SPfC4PHUnCRxfTh8TSUobF8UK6LEZRlnC3LOyDzovr74ZaquPuMeGPhcCQ7BorWsZmO2wu5ciOE9TFXG/b2nyxevQkEi/yFN+jxwxdG3OcvCor1+kH9Y9gSdAZgUY6juVlfW++92OQTV2/qmlyxpvtGsCYZCfvR1jhi9v8fIVUTSSlsyE8AAAAASUVORK5CYII=',
	greenDiamond: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA51JREFUSMells9rXFUUxz/n3Pt+TGObaMbULGwVESnShW5cVlDBhUyUxCRV0O5GEnCjK/0LRN2INolk1ZQgjUamVBDUv0DrQixFg7QqVlNiSTQlmcl797h4k0nSDBnTPnib+w6f8z3fd+65V8yMTo9MDrxMqmqnPp/pGNsJKO9XytytFygZXGHA3qot7hWvHeWpTBOHB/B2lMimOobvqe69yjCJnQAOg9xHyhPy7sCLtwWUjytlPKdJ838RQIB73QLYaZkeOLx/hUEnSUMvzg5BAOfhnqgLKJPp1L6AcmZwBB8GcVZH5RAI5Dk4jhPJMmYDcvaF4f8FlAuVMpp/iDPw/AMIYhByuNmI6HcLAJh8JOd3l75b4UY0oYSyiIFI1Fo3g3oGaTiCDyChTKZn9wTKN8MjYENBwMwygh1sY24ZT71IwtPy5fPVtkC5+FIZ7APyfPPTNTJx5LK9JyFRR4//bdviO/Ltyft3K8zzCRpZH5s7J7PQ9ApMi75xzfAeybcE081aY2YHUC6PjpKHIRqh5RjGluE5cE0gdwVYwlHQTESK/sw5IReHXgMQfjpZJtgl/mj0sZpBw2CNP1kP/QB4gSiCWOCAQq8WGf62y2mWH1s/GEFskMoKB/xxxTNBI/TRyGntiEZY3/qzzTJTgS4pwL0x9Psb6+KK+NRB7LrZyGY88zfh1omj7ndyexApqmc1g7+aBjkrspo5nBYJomaimGUFNw5c32SlBDDrIbIie6sNtsGKhS6iTRgQs0Qpr6q9OX8dzd/GAQ7qzoGXRxFbwVuh6laYhhUSPVYAKaBex61SW1QAe+OLadLwFbFgCRCLw+kCXiABumiWRvF69zMxvlAmEGnNBj89B+BbJaXuFMYljB4M8E4IOTgBaXpsstVurXJlCb9RbXsEyJlKFWQSAUzq5BYQSjt8xNbBGbGUmuqGrTI313Yv2yvnp3DyNV4gtoRIruKbveilUOv1iosoeQ9EUtsOaz9tnL2Kl+VmSzRwWvhWanqoUs9jJYtlCTaqHceXjdauUdJxYoVEHqKkDWIFVUACDR4mEkh0zCq7T8C2E9ue+2yWks5RcneRyI+kCj5Awi90axcRNXt2Z6mdz5Q4GiOWRRJdRY2mqhvELJHE1X0fUvbk7BKxVknkESIxYjWQI0Q6Zk/NLt7+zeG70XOs5Y8Vg0K+t2fmRu7s5iA6Rkmu4uVXNHr9ju82APLD8BCZBnv8k/lOsf8BtGZGlLtvIGQAAAAASUVORK5CYII=',

}

export const imageSizes = {
	door: {
		width: 45,
		height: 122
	},
	elevatorFrame: {
		width: 95,
		height: 137,
	},
	doorBlink: {
		width: 45,
		height: 122,
	},
	doorBlink2: {
		width: 100,
		height: 100,
	},
	doorJam: {
		width: 91,
		height: 5,
	},
	floorShadow: {
		width: 102,
		height: 46,
	},
	indicator: {
		width: 19,
		height: 6,
	}
}

export const elevatorDoor  = (onDown) => (x, y) => {
	return Sprite({
		x,
		y,
		width: imageSizes.door.width,
		height: imageSizes.door.height,
		color: 'rgb(70,203,204)',
		onDown,
	})
}

const elevatorDoorLeft = (x, y) => {
	const elevatorDoorSprite = elevatorDoor()(x + 2, y + 10)

	return elevatorDoorSprite
}

const elevatorDoorRight = (x, y) => {
	const elevatorDoorSprite = elevatorDoor()(x + imageSizes.door.width + 3, y + 10)

	return elevatorDoorSprite
}


export const doorBlinkTop = (x, y) => {
	const sprite = Sprite({
		x,
		y,
		image: new Image(),
	})

	sprite.image.src = images.doorBlink

	return sprite
}

export const doorBlinkBottom = (x, y) => {
	const sprite = Sprite({
		x,
		y,
		image: new Image(),
	})

	sprite.image.src = images.doorBlink2

	return sprite
}

export const wallSprite = (canvasSize, {x, y} = {x: 0, y: 0}) => (color = 'rgb(34,89,131)') => {
	return Sprite({
		x,
		y,
		width: canvasSize.width,
		height: 2 * canvasSize.height / 3,
		color,
	})
}

export const elevatorFrame = (x, y) => {
	return Sprite({
		x,
		y,
		width: imageSizes.elevatorFrame.width,
		height: imageSizes.elevatorFrame.height,
		color: 'rgb(52,125,158)',
	})
}

export const floorSprite = (canvasSize, { x, y } = { x:0, y: 0 }) => {
	return Sprite({
		x: x,
		y: y * canvasSize.height / 3,
		width: canvasSize.width,
		height: canvasSize.height / 3,
		color: 'rgb(1,16,49)',
	})
}

export const stairCaseDoor = (track, clickHandler) => (x, y) => {
	const door = elevatorFrame(x, y)
	const leftDoor = elevatorDoor(clickHandler)(x + 2, y + 3)
	const rightDoor = elevatorDoor(clickHandler)(x + imageSizes.door.width + 3, y + 3)

	track(leftDoor)
	track(rightDoor)

	leftDoor.color = 'rgb(0,0,0)'
	rightDoor.color = 'rgb(0,0,0)'

	leftDoor.width = leftDoor.width + 4
	leftDoor.height = leftDoor.height + 12
	rightDoor.height = rightDoor.height + 12


	return {
		group: [door, leftDoor, rightDoor],
		update() {
			door.update()
			leftDoor.update()
			rightDoor.update()
		},
		render() {
			door.render()
			leftDoor.render()
			rightDoor.render()
		},
	}
}

export const createStaticBackground = (canvasSize, color, xyCoords) => {
	const backGroundWall = wallSprite(canvasSize, xyCoords)(color)
	const backGroundFloor = floorSprite(canvasSize, xyCoords)

	return {
		group: [backGroundWall, backGroundFloor],
		update() {
			backGroundWall.update()
			backGroundFloor.update()
		},
		render() {
			backGroundWall.render()
			backGroundFloor.render()
		},
	}
}

export const wallText = (x, y, text, color = 'rgb(255, 255, 255)', size= 40) => {
	const textSprite = Text({
		text,
		font: `${size}px Arial`,
		color,
		x,
		y,
	});

	textSprite.x = textSprite.x - textSprite.width / 2
	textSprite.y = textSprite.y - textSprite.height / 2

	return textSprite
}

const elevatorButton = (context) => (x, y) => {
	const buttonSprite = Sprite({
		x,
		y,
		width: 25,
		height: 40,
	})

	buttonSprite.render = function() {
		context.fillStyle = 'rgba(52,125,158)'
		context.fillRect(this.x, this.y, this.width, this.height)

		context.strokeStyle = 'rgb(54,199,200)'
		context.lineWidth = 1
		context.strokeRect(this.x+2, this.y+2, this.width-4, this.height-4)

		context.stroke()
	}

	return buttonSprite
}

const triangleUp = (context, state) => (x, y) => {
	const triangleSprite = Sprite({
		x,
		y,
		width: 25,
		height: 25,
		image: new Image(),
	})

	triangleSprite.image.src = images.arrowUp

	return triangleSprite
}

const triangleDown = (context, state) => (x, y) => {
	const triangleSprite = Sprite({
		x,
		y,
		width: 25,
		height: 25,
		image: new Image(),
	})

	triangleSprite.image.src = images.arrowDown

	return triangleSprite
}

const floorIndicator = (context, state) => (x, y) => {
	const indicatorSprite = Sprite({
		x,
		y,
		width: 30,
		height: 15,
	})

	const textSprite = Text({
		text: '',
		font: `11px Arial`,
		color: 'rgb(255,0,0)',
		x,
		y,
	})

	indicatorSprite.render = function() {
		context.fillStyle = 'rgba(0, 0, 0)'
		context.fillRect(this.x, this.y, this.width, this.height)

		context.stroke()
		textSprite.render()
	}

	indicatorSprite.update = function() {
		textSprite.text = state.currentFloor
		textSprite.x = indicatorSprite.x + indicatorSprite.width / 2 - textSprite.width / 2
		textSprite.y = indicatorSprite.y + 3
		textSprite.update()
	}

	return indicatorSprite
}

export const elevator = (track, context, handler, state, pointer, yAxisShift, gameContext, floorNumber, canvasSize) => (x, y) => {
	const frame = elevatorFrame(x, y)
	const elevatorButtonSprite = elevatorButton(context)(frame.x + frame.width + 2, frame.y + frame.height / 2 - 20)
	const triangleUpSprite= triangleUp(context, state)(elevatorButtonSprite.x+8, elevatorButtonSprite.y+7)
	const triangleDownSprite= triangleDown(context, state)(elevatorButtonSprite.x+8, elevatorButtonSprite.y+25)

	const leftDoor = elevatorDoorLeft(x, y)
	const rightDoor = elevatorDoorRight(x, y)

	track(triangleUpSprite, triangleDownSprite, frame)

	frame.onDown = () => {
		if (state.isOpen && !state.isClosing && gameContext.activeFloor === state.currentFloor) {
			state.isShowingFloorSelector = true
		}
	}

	const group = [
		frame,
		leftDoor,
		rightDoor,
		elevatorButtonSprite,
		triangleDownSprite,
		triangleUpSprite,
		floorIndicator(context, state)(frame.x + frame.width / 2 - 15, frame.y - 6),
		// doorBlinkTop(background.x - imageSizes.door.width + 3 + imageSizes.doorBlink.width , y + 10),
		// doorBlinkTop(background.x + imageSizes.door.width + 3 , y + 10),
		// doorBlinkBottom(background.x + imageSizes.door.width - imageSizes.doorBlink.width + 8 , y + imageSizes.door.height - imageSizes.doorBlink2.height / 2 - 12),
		// doorBlinkBottom(background.x + imageSizes.doorBlink.width + 8 , y + imageSizes.door.height - imageSizes.doorBlink2.height / 2 - 12),
	]

	return {
		group,
		update(diffTime) {
			group.map(sprite => sprite.update())
			const distanceTopArrow = Math.sqrt(
				(triangleUpSprite.x - (pointer.x - 15)) ** 2 + (triangleUpSprite.y - (pointer.y - 15) - yAxisShift) ** 2
			)

			const distanceBottomArrow = Math.sqrt(
				(triangleDownSprite.x - (pointer.x - 15)) ** 2 + (triangleDownSprite.y - (pointer.y - 15) - yAxisShift) ** 2
			)

			if ((distanceTopArrow < 15 || distanceBottomArrow < 15)  && pointerPressed('left') && !state.isOpen && !state.isClosing && !state.isMoving) {
				state.targetFloor = gameContext.activeFloor
				state.isMoving = state.targetFloor !== state.currentFloor
				state.isMovingUp = state.targetFloor > state.currentFloor
				state.isMovingDown = state.targetFloor < state.currentFloor
				state.shouldOpen = true
				state.isShowingFloorSelector = false
			}

			if (state.isOpening && state.currentFloor === floorNumber) {
				if (leftDoor.x > x - leftDoor.width + 13) {
					leftDoor.x = leftDoor.x - 0.5
				}
				if (rightDoor.x < x + frame.width - 13) {
					rightDoor.x = rightDoor.x + 0.5
				}
				if (!(leftDoor.x > x - leftDoor.width + 13) && !(rightDoor.x < x + frame.width - 13)) {
					state.isOpening = false
					state.isOpen = true
					state.shouldOpen = false
					state.autoClose = 30
				}
			}

			if (state.isClosing && state.currentFloor === floorNumber) {
				if (leftDoor.x < frame.x + 2) {
					leftDoor.x = leftDoor.x + 0.6
				}
				if (rightDoor.x > frame.x + frame.width / 2 + 1) {
					rightDoor.x = rightDoor.x - 0.6
				}

				if (leftDoor.x > frame.x + 2 && rightDoor.x <= frame.x + frame.width / 2 + 1) {
					state.isClosing = false
					state.isOpen = false
					state.isMoving = state.targetFloor !== state.currentFloor
					state.isMovingUp = state.targetFloor > state.currentFloor
					state.isMovingDown = state.targetFloor < state.currentFloor
					state.isShowingFloorSelector = false
					state.autoClose = null
				}
			}

			if (state.autoClose !== null && state.isOpen && !state.isClosing && !state.isShowingFloorSelector) {
				state.autoClose = state.autoClose - diffTime
			}

			if (state.autoClose <= 0 && state.autoClose !== null) {
				state.autoClose = null
				state.isClosing = true
				state.shouldOpen = false
			}
		},
		render() {
			group.map(sprite => sprite.render())
		},
	}
}

export const closedDoorStairCase = (track, onDown) => (x, y) => {
	const doorSprite =  Sprite({
		x,
		y,
		width: imageSizes.door.width * 2,
		height: imageSizes.door.height,
		color: 'rgb(105,66,0)',
		onDown,
	})

	track(doorSprite)

	return doorSprite
}

export const gemSprite = (itemState) => (track) => () => {
	const sprite = Sprite({
		type: 'yellow-gem',
		x: itemState.x,
		y: itemState.y,
		width: 50,
		height: 50,
		image: new Image(),
	})

	sprite.image.src = images.yellowGem

	track(sprite)

	sprite.update = function() {
		if (itemState.isDragging) {
			this.x = itemState.x
			this.y = itemState.y
		} else {
			if (itemState.isPicked) {
				this.x = itemState.x
				this.y = itemState.y
			}

			if (!itemState.isPicked) {
				this.x = itemState.x
				this.y = (itemState.currentFloor - 1) * 600 + itemState.y
			}
		}
	}

	return sprite
}

export const diamondSprite = (itemState) => (track) => () => {
	const sprite = Sprite({
		type: 'diamond',
		x: itemState.x,
		y: itemState.y,
		width: 50,
		height: 50,
		image: new Image(),
	})

	sprite.image.src = images.diamond

	track(sprite)

	sprite.update = function() {
		if (itemState.isDragging) {
			this.x = itemState.x
			this.y = itemState.y
		} else {
			if (itemState.isPicked) {
				this.x = itemState.x
				this.y = itemState.y
			}

			if (!itemState.isPicked) {
				this.x = itemState.x
				this.y = (itemState.currentFloor - 1) * 600 + itemState.y
			}
		}
	}

	return sprite
}

export const redGemSprite = (itemState) => (track) => () => {
	const sprite = Sprite({
		type: 'red-gem',
		x: itemState.x,
		y: itemState.y,
		width: 50,
		height: 50,
		image: new Image(),
	})

	track(sprite)

	sprite.image.src = images.diamondBlue

	sprite.update = function() {
		if (itemState.isDragging) {
			this.x = itemState.x
			this.y = itemState.y
		} else {
			if (itemState.isPicked) {
				this.x = itemState.x
				this.y = itemState.y
			}

			if (!itemState.isPicked) {
				this.x = itemState.x
				this.y = (itemState.currentFloor - 1) * 600 + itemState.y
			}
		}
	}

	return sprite
}
export const yellowDiamondSprite = (itemState) => (track) => () => {
	const sprite = Sprite({
		type: 'yellow-diamond',
		x: itemState.x,
		y: itemState.y,
		width: 50,
		height: 50,
		image: new Image(),
	})

	track(sprite)

	sprite.image.src = images.diamondYellow

	sprite.update = function() {
		if (itemState.isDragging) {
			this.x = itemState.x
			this.y = itemState.y
		} else {
			if (itemState.isPicked) {
				this.x = itemState.x
				this.y = itemState.y
			}

			if (!itemState.isPicked) {
				this.x = itemState.x
				this.y = (itemState.currentFloor - 1) * 600 + itemState.y
			}
		}
	}

	return sprite
}
export const orangeDiamondSprite = (itemState) => (track) => () => {
	const sprite = Sprite({
		type: 'orange-diamond',
		x: itemState.x,
		y: itemState.y,
		width: 50,
		height: 50,
		image: new Image(),
	})

	track(sprite)

	sprite.image.src = images.orangeDiamond

	sprite.update = function() {
		if (itemState.isDragging) {
			this.x = itemState.x
			this.y = itemState.y
		} else {
			if (itemState.isPicked) {
				this.x = itemState.x
				this.y = itemState.y
			}

			if (!itemState.isPicked) {
				this.x = itemState.x
				this.y = (itemState.currentFloor - 1) * 600 + itemState.y
			}
		}
	}

	return sprite
}
export const emeraldSprite = (itemState) => (track) => () => {
	const sprite = Sprite({
		type: 'emerald',
		x: itemState.x,
		y: itemState.y,
		width: 50,
		height: 50,
		image: new Image(),
	})

	track(sprite)

	sprite.image.src = images.emerald

	sprite.update = function() {
		if (itemState.isDragging) {
			this.x = itemState.x
			this.y = itemState.y
		} else {
			if (itemState.isPicked) {
				this.x = itemState.x
				this.y = itemState.y
			}

			if (!itemState.isPicked) {
				this.x = itemState.x
				this.y = (itemState.currentFloor - 1) * 600 + itemState.y
			}
		}
	}

	return sprite
}
export const redDiamondSprite = (itemState) => (track) => () => {
	const sprite = Sprite({
		type: 'red-diamond',
		x: itemState.x,
		y: itemState.y,
		width: 50,
		height: 50,
		image: new Image(),
	})

	track(sprite)

	sprite.image.src = images.redDiamond

	sprite.update = function() {
		if (itemState.isDragging) {
			this.x = itemState.x
			this.y = itemState.y
		} else {
			if (itemState.isPicked) {
				this.x = itemState.x
				this.y = itemState.y
			}

			if (!itemState.isPicked) {
				this.x = itemState.x
				this.y = (itemState.currentFloor - 1) * 600 + itemState.y
			}
		}
	}

	return sprite
}
export const greenDiamondSprite = (itemState) => (track) => () => {
	const sprite = Sprite({
		type: 'green-diamond',
		x: itemState.x,
		y: itemState.y,
		width: 50,
		height: 50,
		image: new Image(),
	})

	track(sprite)

	sprite.image.src = images.greenDiamond

	sprite.update = function() {
		if (itemState.isDragging) {
			this.x = itemState.x
			this.y = itemState.y
		} else {
			if (itemState.isPicked) {
				this.x = itemState.x
				this.y = itemState.y
			}

			if (!itemState.isPicked) {
				this.x = itemState.x
				this.y = (itemState.currentFloor - 1) * 600 + itemState.y
			}
		}
	}

	return sprite
}

export const elevatorFloorSelector = (context, state, gameContext, canvasSize, gameElementsState, slotCoordinates) => () => {
	const shadowDrop = Sprite({
		x: 0,
		y: 0,
		width: canvasSize.width,
		height: canvasSize.height,
		color: 'rgba(0,0,0,0.55)',
	})

	const dashboardPlate = Sprite({
		x: shadowDrop.width / 2 - 150,
		y: shadowDrop.height / 2 - 250,
		width: 300,
		height: 500,
		color: 'rgba(52,125,158)',
	})

	const buttons = [1,2,3,4,5,6,7,8,9,10,11,12,13].map(
		floorNumber => {
			let button = Button({
				x: dashboardPlate.x + 68 + (floorNumber - 1) % 3 * 85,
				y: dashboardPlate.y + 80 + Math.floor((floorNumber - 1) / 3)  * 55,
				width: 70,
				height: 30,
				anchor: {x: 0.5, y: 0.5},
				color: 'rgb(0,104,148)',

				// text properties
				text: {
					text: floorNumber,
					color: 'white',
					font: '20px Arial, sans-serif',
					anchor: {x: 0.5, y: 0.5}
				},

				// pointer events
				onDown() {
					this.y += 3;
				},
				onUp() {
					this.y -= 3;

					const activeState = Object.values(state).find(({ isShowingFloorSelector }) => isShowingFloorSelector)
					activeState.isShowingFloorSelector = false
					activeState.targetFloor = floorNumber
					activeState.isClosing = true
					activeState.isMovingUser = true
					activeState.shouldOpen = true
					activeState.autClose = null
				}
			});

			return button
		}
	)

	const exitButton = Button({
		x: dashboardPlate.x + dashboardPlate.width / 2,
		y: dashboardPlate.y + dashboardPlate.height - 40,
		width: 90,
		height: 40,
		anchor: {x: 0.5, y: 0.5},
		color: 'rgb(255,175,51)',

		// text properties
		text: {
			text: 'EXIT',
			color: 'black',
			font: '20px Arial, sans-serif',
			anchor: {x: 0.5, y: 0.5}
		},

		// pointer events
		onDown() {
			this.y += 3;
			Object.values(gameElementsState).filter(({ picked }) => picked).forEach(({ type, slotNumber, x, y, ...rest }) => {
				gameElementsState[type] = {
					slotNumber,
					x: slotCoordinates[`slot${slotNumber}`].x0 + 9,
					y: slotCoordinates[`slot${slotNumber}`].y0 + 9,
					...rest,
					picked: true,
					isDragging: false,
					placedToHole: false,
					elevatorPlaced: null,
				}
			})
		},
		onUp() {
			this.y -= 3;

			const activeState = Object.values(state).find(({ isShowingFloorSelector }) => isShowingFloorSelector)
			activeState.isShowingFloorSelector = false
			activeState.autoClose = 30
		}
	})

	buttons.push(exitButton)

	const itemHole = Button({
		x: dashboardPlate.x + dashboardPlate.width / 2 - 50,
		y: dashboardPlate.y + dashboardPlate.height - 180,
		width: 100,
		height: 100,
		radius: 30,
		color: 'rgb(255,255,198)',
	})

	itemHole.render = function() {
		// // Draw the rectangle (or the outer shape)
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, 0, Math.PI * 2);
		context.fill();
		context.globalCompositeOperation = 'destination-out';  // Erase part of the shape
		context.beginPath();
		context.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius-5, 0, Math.PI * 2);
		context.fill();
		context.globalCompositeOperation = 'source-over';
	}

	const spriteGroup = [shadowDrop, dashboardPlate, ...buttons, itemHole]

	return {
		group: spriteGroup,
		update: () => {
			spriteGroup.map(sprite => sprite.update())
		},
		render: () => {
			spriteGroup.map(sprite => sprite.render())
		}
	}
}
