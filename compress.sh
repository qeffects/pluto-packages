(
    cd ./packages/
    for dir in ./*; do (echo $dir); done
    for dir in ./*; do (
        cd $dir/module
        tar -cza -f "../../../$dir.tar.gz" *
    ); done
)