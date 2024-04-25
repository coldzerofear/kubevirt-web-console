FROM bitnami/kubectl:1.26.1
ADD static /static
CMD ["proxy", "--www=/static", "--accept-hosts=^.*$", "--address=[::]", "--api-prefix=/apis/subresources.kubevirt.io/v1/namespaces/", "--www-prefix="]

#/apis/subresources.kubevirt.io/v1/namespaces/{namespace}/virtualmachineinstances/{name}/vnc